import { useState, ChangeEvent } from "react";
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
// import { Amplify } from 'aws-amplify';
// import outputs from '../amplify_outputs.json';
// import React from 'react';
import { uploadData } from 'aws-amplify/storage';

// Amplify.configure(outputs);

// const client = generateClient<Schema>();

// function App() {
//   const [file, setFile] = useState();

//   const handleChange = (event: any) => {
//     setFile(event.target.files[0]);
//   };
//   // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

//   // useEffect(() => {
//   //   client.models.Todo.observeQuery().subscribe({
//   //     next: (data) => setTodos([...data.items]),
//   //   });
//   // }, []);

//   // function createTodo() {
//   //   client.models.Todo.create({ content: window.prompt("Todo content") });
//   // }

//   return (
//     <main>
//       <div>
//       <input type="file" onChange={handleChange} />
//         <button
//           onClick={() =>
//             uploadData({
//               path: 'picture-submissions/test.jpg',
//               data: file,
//           })
//         }
//       >
//         Upload
//       </button>
//       </div>
//     {/* </div>
//       <h1>My todos</h1>
//       <button onClick={createTodo}>+ new</button>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>{todo.content}</li>
//         ))}
//       </ul>
//       <div>
//         🥳 App successfully hosted. Try creating a new todo.
//         <br />
//         <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
//           Review next step of this tutorial.
//         </a>
//       </div> */}
//     </main>
//   );
// }

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const uploadFile = async () => {
    if (file) {
      try {
        const result = uploadData({
          path: `picture-submissions/${file.name}`,
          data: file,
      })
        setUploadStatus('File uploaded successfully');
        console.log('File uploaded successfully:', result);
      } catch (error) {
        setUploadStatus('Error uploading file');
        console.log('Error uploading file:', error);
      }
    } else {
      setUploadStatus('No file selected');
      console.log('No file selected');
    }
  };

  return (
    <main>
      <div>
        <input type="file" onChange={handleChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
      {uploadStatus && <p>{uploadStatus}</p>}
    </main>
  );
}

export default App;
