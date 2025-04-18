


export function Kanban({ authUser }) {


    const arr = ['todo', 'progress', 'done']


    return (
        <div className="kanban-board">
            <div className="groups-container">
                {arr.map((group, index) => {

                    return (
                        <div key={group + index}>
                            {group}
                            {authUser[group]?.map((plan, index) => {
                                return (<div key={plan.title + index}>
                                    {plan.title} , {plan.discreption}
                                </div>)

                            })}
                        </div>
                    )
                })}


            </div>

        </div>
    )
}