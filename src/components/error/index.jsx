import React, { useEffect } from "react";


function RedirectInfo() {

    useEffect(() => {
        document.title = `Holidaze | Error`;
    })

    return (
        <div>
            <div>
                <h1>You need to be logged in to view this page</h1>
                <div>
                    <p>Please <a href="/login" color="secondary">log in here</a></p>
                    <p>Don't have an account yet? <a href="/register" color="secondary">Register here</a></p>
                </div>
            </div>
        </div>
    )
}

export default RedirectInfo;