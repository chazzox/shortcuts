"use client";
import "./test.scss";
import { useState } from "react";

export default function Home() {
    const [cols, setCols] = useState("10");
    const [rows, setRows] = useState("10");

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

            <div
                className="grid"
                // @ts-expect-error
                style={{ "--col-count": cols, "--row-count": rows }}
            >
                <SingleCellTile x={0} y={0} />
                <DoubleCellTile x={3} y={4} />
                <QuadCellTile x={5} y={5} />
            </div>
        </main>
    );
}

interface TileProps {
    x: number;
    y: number;
}

const SingleCellTile: React.FC<TileProps> = ({ x, y }) => {
    return <div className="tile single" style={{ "--x": x, "--y": y }}></div>;
};

const DoubleCellTile: React.FC<TileProps> = ({ x, y }) => {
    return <div className="tile double" style={{ "--x": x, "--y": y }}></div>;
};

const QuadCellTile: React.FC<TileProps> = ({ x, y }) => {
    return <div className="tile quad" style={{ "--x": x, "--y": y }}></div>;
};
