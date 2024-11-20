import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as logsService from "../../services/logsService"
function LogsList() {
    const [logs, setLogs] = useState([])
    const { itemId } = useParams()

    useEffect(() => {
        async function getLogs() {
            try {
                const allLogs = await logsService.show(itemId);
                if (logs.error) {
                    throw new Error(logs.error)
                }
                setLogs(allLogs);
            } catch (error) {
                console.log(error)
            }
        }

        getLogs();
    }, [])

    return (
        <main>
            <dl>
                {logs.map((log) => (
                    <section key={log._id}>
                        <dt>Item:</dt>
                        <dd>{log.item}</dd>
                        <dt>Action:</dt>
                        <dd>{log.action} - {log.details}</dd>
                        <dt>Date:</dt>
                        <dd>{log.timestamp}</dd>
                    </section>
                ))}
            </dl>
        </main>
    )
}

export default LogsList