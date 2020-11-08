import React from "react";
import Paper from "@material-ui/core/Paper";
import { LoginButton, SignupButton } from "./navigation";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 2),
        margin: "50px",
    },
    button: {
        margin: "30px",
    },
    flex: {
        flex: "true",
        textAlign: "center",
    },
    gridc: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "20px",
    },
}));

function Home() {
    const classes = useStyles();

    return (
        <div>
            <div />
            <div>
                <Paper elevation={7} className={classes.root}>
                    <div className={classes.flex}>
                        <LoginButton />
                        <SignupButton />
                        <Typography>
                            Sound Bite ... Conveniently access crowd sourced details and information through text searchable voice clips
                        </Typography>
                    </div>
                </Paper>


            </div>

        </div>
    );
}

export default Home;