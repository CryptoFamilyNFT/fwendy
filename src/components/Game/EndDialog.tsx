import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material"
import React from "react"


function EndDialog(props: {showDialog: boolean, score: number, bestScore: number}) {
  return (
    <Dialog
        open={props.showDialog}
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Score: {props.score} &nbsp; 
            Best: {props.bestScore}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => window.location.reload()} color="primary">
            Restart
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default EndDialog