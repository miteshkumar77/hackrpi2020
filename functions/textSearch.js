const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');
const { algoliaConfig } = require('./config');
const client = algoliasearch(algoliaConfig.ALGOLIA_ID, algoliaConfig.ALGOLIA_ADMIN_KEY);
const index = client.initIndex(algoliaConfig.ALGOLIA_INDEX_NAME);
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

const addToIndex = functions.firestore.document('transcription/{transcriptionID}').onCreate(snapshot => {
    const data = snapshot.data();
    const objectID = snapshot.id;
    return index.saveObject({ text: data.text, username: data.username, bucket: data.bucket, location: data.location, objectID });
});

const updateIndex = functions.firestore.document('transcription/{transcriptionID}').onUpdate((change) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return index.saveObject({ text: data.text, username: data.username, bucket: data.bucket, location: data.location, objectID });
});

const deleteFromIndex = functions.firestore.document('transcription/{transcriptionID}')
    .onDelete((snapshot) => {
        const data = snapshot.data();

        index.deleteObject(snapshot.id)
        storage.bucket(data.bucket).file(data.location).delete();

    });

module.exports.addToIndex = addToIndex;
module.exports.updateIndex = updateIndex;
module.exports.deleteFromIndex = deleteFromIndex; 