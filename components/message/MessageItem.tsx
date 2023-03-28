import { Button } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import axios from 'axios'
import { useRouter } from 'next/router'
import swal from 'sweetalert'
import Moment from 'react-moment'

const SERVERURL = "http://localhost:3001/";

export default function MessageItem({ message }: any) {

    const router = useRouter()

    const deleteMessage = async (id: any) => {
        axios.delete(`${SERVERURL}api/v1/message/${id}`)
          .then(function (response) {
            swal({
              title: "Message Deleted!",
              text: "Message task deleted successfully",
              icon: "danger",
            });
          })
        .catch(function (error) {
            console.log(error);
        });
        router.push("/")
    }

    const updateMessage = async (id: any) => {
        axios.put(`${SERVERURL}api/v1/message/${id}`, {
            title: message.title,
            description: message.description,
            completed: !message.completed,
            time: message.time
          })
          .then(function (response) {
            swal({
              title: "Message Updated!",
              text: "Message task Updated successfully",
              icon: "success",
            });
          })
          .catch(function (error) {
            console.log(error);
          });

          router.push("/")
    }


    return (
        <div className="card mt-4">
            {message.completed? <h2><del>{ message.title }</del></h2> : <h2>{ message.title }</h2>}
            <p>{ message.description }</p>
			<div className="mt-3 datetime">
				<Icon.Clock />
				<Moment format="YYYY/MM/DD">
					{ message.time }
				</Moment>
			</div>
			<div className="mt-3 buttons">
            {message.completed? 
                <Button variant="success" onClick={() => (updateMessage(message.id))}>Completed</Button>
                :
                <Button variant="primary" onClick={() => (updateMessage(message.id))}>Complete</Button>
            }
            <Button variant="danger" onClick={() => (deleteMessage(message.id))}>Delete</Button>
			</div>
        </div>
    )
}