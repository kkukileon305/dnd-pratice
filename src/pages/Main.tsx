import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { BiMenu } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import Modal from '../components/Modal';
import dataList from '../data.json';

const navList = ['info', 'about', 'pages'];

const Main = () => {
  const [modal, setModal] = useState(false);

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
    <>
      <header className='bg-gray-400/50 sticky top-0 backdrop-blur'>
        <div className='mx-auto max-w-[1280px] px-4 w-full flex items-center justify-between'>
          <Link to={'/'} className='font-bold py-4 text-2xl'>
            연습용 Dnd
          </Link>
          <div className='flex items-center gap-8'>
            <Link to='/search' className='bg-gray-300/50 hover:bg-gray-200 transition-[0.1s] rounded-full hidden md:flex items-center gap-4 px-4 py-2'>
              <BsSearch />
              <p className='w-32 text-left text-gray-500'>검색해보기</p>
            </Link>
            <nav className='hidden gap-4 sm:flex'>
              {navList.map(data => (
                <Link className='text-xl text-gray-700 hover:text-gray-300 transition-[0.2s]' to={`/${data}`} key={data}>
                  {data}
                </Link>
              ))}
            </nav>
            <button onClick={() => setModal(true)} className='block sm:hidden'>
              <BiMenu size={30} />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>{modal && <Modal setModal={setModal} />}</AnimatePresence>
      <div className='mx-auto max-w-[780px] w-full flex flex-col items-center px-4'>
        <h2 className='font-bold text-2xl my-12'>드래그해보세요</h2>
        <div className='flex flex-col h-[780px] md:flex-row justify-center items-center md:items-stretch gap-20'>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='posts1'>
              {(provided, snapshot) => (
                <ul className={`posts1 px-4 rounded-xl mt-4 w-[300px] transition-[0.2s] ${snapshot.isDraggingOver ? 'bg-gray-400' : 'bg-transparent'}`} ref={provided.innerRef} {...provided.droppableProps}>
                  {posts1.map((post, index) => (
                    <Draggable key={post.id} index={index} draggableId={post.id.toString()}>
                      {(innerProvided, innerSnapshot) => (
                        <li //
                          ref={innerProvided.innerRef}
                          {...innerProvided.dragHandleProps}
                          {...innerProvided.draggableProps}
                          className='py-4'
                        >
                          <div className={`border border-gray-300 hover:bg-gray-200 p-2 shadow-md rounded-xl ${innerSnapshot.isDragging ? 'bg-gray-300' : 'bg-white'}`}>
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
                <ul className={`posts2 rounded-xl px-4 mt-4 w-[300px] transition-[0.2s] ${snapshot.isDraggingOver ? 'bg-gray-400' : 'bg-transparent'}`} ref={provided.innerRef} {...provided.droppableProps}>
                  {posts2.map((post, index) => (
                    <Draggable key={post.id} index={index} draggableId={post.id.toString()}>
                      {(innerProvided, innerSnapshot) => (
                        <li //
                          ref={innerProvided.innerRef}
                          {...innerProvided.dragHandleProps}
                          {...innerProvided.draggableProps}
                          className='py-4'
                        >
                          <div className={`border border-gray-300 hover:bg-gray-200 p-2 shadow-md rounded-xl ${innerSnapshot.isDragging ? 'bg-gray-300' : 'bg-white'}`}>
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
        <h2 className='font-bold text-2xl my-12'>멋있는 이미지</h2>
        <img src='https://images.unsplash.com/photo-1665686308827-eb62e4f6604d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' alt='images' className='my-12' />
        <h2 className='font-bold text-2xl my-12'>진짜 아무 의미없는 이미지</h2>
        <img src='https://images.unsplash.com/photo-1669135021171-0a4fcdd52de6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' alt='images' className='my-12' />
      </div>
    </>
  );
};
export default Main;
