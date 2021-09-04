import React from 'react';

function ProgressBar(props) {
    const todosCompletedCount = () => {
        return props.todos.filter(todo => todo.status==='3').length;
    };

    const percentage = () => {
        return (todosCompletedCount() / props.todos.length) * 100;
    };

    return (
        <progress
            className="progress is-info"
            value={percentage().toString()}
            max="100"
        >
            {percentage()}%
        </progress>
    );
}

export default ProgressBar;