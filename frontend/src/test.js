import { useState, useEffect } from 'react';
import React from 'react';
import './style/app.css'

function Test() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/getall')
        .then(result => result.json())
        .then(data => {
            console.log(data);
            setData(data.result)
        })
    }, [])

    return (
        <div className="test-block">
            <div>test 1</div>
            <div>test 2</div>
            {data.map(item => (
                <div key={item.id} className="test-item">{item.id} : {item.texte_article}</div>
            ))}
        </div>

    )
}

export default Test;