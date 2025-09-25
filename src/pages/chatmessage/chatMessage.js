export default function ChatMessage(props) {
    const message = props.message;
  
    console.log(props)
    return (
        <><div>
        {message}
        </div>
        </>
    );

}
