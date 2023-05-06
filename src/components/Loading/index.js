import React, { memo } from "react";

function Loading() {
    return (
        <div className="loading">
            <img alt="pikachu-running" src="./assets/patterns/pikachu-running.gif" className="empty-list" />
            <p>Loading...</p>
        </div>
    )
}

export default memo(Loading);