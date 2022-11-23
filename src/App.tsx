import { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import dataList from './data.json';

const App = () => {
  const [posts1, setPosts1] = useState(dataList.slice(0, 3));
  const [posts2, setPosts2] = useState(dataList.slice(3, 5));

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.destination.droppableId === result.source.droppableId) {
      const _posts = result.source.droppableId === 'posts1' ? [...posts1] : [...posts2];

      const [dragged] = _posts.splice(result.source.index, 1);
      _posts.splice(result.destination.index, 0, dragged);

      result.source.droppableId === 'posts1' ? setPosts1(_posts) : setPosts2(_posts);
    } else {
      const _posts1 = [...posts1];
      const _posts2 = [...posts2];

      if (result.source.droppableId === 'posts1') {
        const [dragged] = _posts1.splice(result.source.index, 1);
        _posts2.splice(result.destination.index, 0, dragged);
      } else {
        const [dragged] = _posts2.splice(result.source.index, 1);
        _posts1.splice(result.destination.index, 0, dragged);
      }

      setPosts1(_posts1);
      setPosts2(_posts2);
    }
  };

  return (
    <main className='bg-gray-200 min-h-[100vh]'>
      <div className='bg-red-200'>
        <h1 className='mx-auto max-w-[1280px] w-full px-6 font-bold py-4 text-2xl'>연습용 Dnd</h1>
      </div>
      <div className='mx-auto max-w-[1280px] w-full px-2'>
        <div className='flex flex-col md:flex-row justify-center gap-20'>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='posts1'>
              {(provided, snapshot) => (
                <ul className={`posts1 px-4 rounded-xl mt-4 transition-[0.2s] ${snapshot.isDraggingOver ? 'bg-gray-400' : 'bg-transparent'}`} ref={provided.innerRef} {...provided.droppableProps}>
                  {posts1.map((post, index) => (
                    <Draggable key={post.id} index={index} draggableId={post.id.toString()}>
                      {(innerProvided, innerSnapshot) => (
                        <li //
                          ref={innerProvided.innerRef}
                          {...innerProvided.dragHandleProps}
                          {...innerProvided.draggableProps}
                          className='py-4'
                        >
                          <div className={`border border-gray-300 p-2 shadow-md rounded-xl ${innerSnapshot.isDragging ? 'bg-gray-300' : 'bg-white'}`}>
                            <h2 className='font-bold mb-2'>{post.title}</h2>
                            <div className='flex flex-wrap gap-2'>
                              {post.tags.map(tag => (
                                <button className='py-1 px-4 bg-slate-400 rounded-full font-bold text-white' key={tag}>
                                  {tag}
                                </button>
                              ))}
                            </div>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            <Droppable droppableId='posts2'>
              {(provided, snapshot) => (
                <ul className={`posts2 rounded-xl px-4 mt-4 transition-[0.2s] ${snapshot.isDraggingOver ? 'bg-gray-400' : 'bg-transparent'}`} ref={provided.innerRef} {...provided.droppableProps}>
                  {posts2.map((post, index) => (
                    <Draggable key={post.id} index={index} draggableId={post.id.toString()}>
                      {(innerProvided, innerSnapshot) => (
                        <li //
                          ref={innerProvided.innerRef}
                          {...innerProvided.dragHandleProps}
                          {...innerProvided.draggableProps}
                          className='py-4'
                        >
                          <div className={`border border-gray-300 p-2 shadow-md rounded-xl ${innerSnapshot.isDragging ? 'bg-gray-300' : 'bg-white'}`}>
                            <h2 className='font-bold mb-2'>{post.title}</h2>
                            <div className='flex flex-wrap gap-2'>
                              {post.tags.map(tag => (
                                <button className='py-1 px-4 bg-slate-400 rounded-full font-bold text-white' key={tag}>
                                  {tag}
                                </button>
                              ))}
                            </div>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </main>
  );
};

export default App;
