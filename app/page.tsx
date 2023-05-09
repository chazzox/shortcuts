"use client";
import { useState } from "react";

export default function Home() {
    const [cols, setCols] = useState("0");
    const [rows, setRows] = useState("0");

    return (
        <main>
            <input
                type="text"
                value={cols.toString()}
                onChange={(e) => setCols(e.currentTarget.value)}
            />
            <input
                type="text"
                value={rows.toString()}
                onChange={(e) => setRows(e.currentTarget.value)}
            />

            {[...new Array(Number(cols)).keys()].map((col) => (
                <div className="col">
                    {[...new Array(Number(rows)).keys()].map((row) => (
                        <div className="col">a</div>
                    ))}
                </div>
            ))}
        </main>
    );
}
