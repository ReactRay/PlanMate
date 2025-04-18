import { useDraggable } from '@dnd-kit/core'

export function KanbanTask({ task, group }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id,
        data: { task, group },
    })

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        cursor: 'grab',
    }


    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`task-card ${group}`}
        >
            <div className="task-title">{task.title}</div>
            <div className="task-meta">
                <span className="duration">⏱ {task.duration}h</span>
                <span className={`priority ${task.priority}`}>
                    {task.priority}
                </span>
            </div>
            <div className="task-desc">{task.description}</div>
        </div>
    )
}
