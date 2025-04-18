import { DndContext } from '@dnd-kit/core'
import { KanbanGroup } from './KanbanGroup'
import { useAuthStore } from '../store/useAuthStore'

export function Kanban() {
    const { authUser, updateTaskGroup } = useAuthStore()
    const groups = ['todo', 'progress', 'done']

    if (!authUser) return null

    function handleDragEnd(event) {
        const { active, over } = event
        if (!over || active.data.current.group === over.id) return

        const task = active.data.current.task
        updateTaskGroup(task, active.data.current.group, over.id)
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="kanban-board">
                <div className="groups-container">
                    {groups.map((group) => (
                        <KanbanGroup key={group} group={group} tasks={authUser[group]} />
                    ))}
                </div>
            </div>
        </DndContext>
    )
}
