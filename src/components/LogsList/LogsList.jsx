import { useState, useEffect } from "react"
import * as logsService from "../../services/logsService"
function LogsList() {
    const [logs, setLogs] = useState([])

    useEffect(() => {
        async function getLogs() {
            try {
                const allLogs = await logsService.index();
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