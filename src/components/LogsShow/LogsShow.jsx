import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as logsService from "../../services/logsService"
import { Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

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
        <Container>
            <Table bordered striped hover>
                <thead>
                    <tr>
                        <th>Item:</th>
                        <th>Action:</th>
                        <th>Details:</th>
                        <th>Date:</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log._id}>
                            <td>{log.item}</td>
                            <td>{log.action}</td>
                            <td>{log.details}</td>
                            <td>{log.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default LogsList