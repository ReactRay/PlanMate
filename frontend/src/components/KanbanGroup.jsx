import { useDroppable } from '@dnd-kit/core'
import { KanbanTask } from './KanbanTask'

export function KanbanGroup({ group, tasks }) {
    const { setNodeRef } = useDroppable({ id: group })

    return (
        <div ref={setNodeRef} className="kanban-group">
            <div className="group-header">
                <h3>{group.toUpperCase()}</h3>
            </div>

            <div className="task-list">
                {tasks.map((task) => (
                    <KanbanTask key={task._id} task={task} group={group} />
                ))}
            </div>
        </div>
    )
}
