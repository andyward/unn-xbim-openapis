
function formatDate(date) {
    return date.toLocaleDateString();
  }
  
export function Comment(props) {

    
    

    return (
      <div className="Comment">
        <div className="UserInfo">
          <img className="Avatar"
               src={props.author.avatarUrl}
               alt={props.author.name} />
          <div className="UserInfo-name">
            {props.author.name}
          </div>
        </div>
        <div className="Comment-text">
          {props.text}
        </div>
        <div className="Comment-date">
          {formatDate(props.date)}
        </div>
      </div>
    );
  }
  
  
  
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   root.render(
//     <Comment
//       date={comment.date}
//       text={comment.text}
//       author={comment.author} />
//   );
  