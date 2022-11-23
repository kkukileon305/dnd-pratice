import { motion } from 'framer-motion';
import { BsSearch, BsMoon } from 'react-icons/bs';
import { Link } from 'react-router-dom';

interface ModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ setModal }: ModalProps) => {
  const closeModal: React.MouseEventHandler<HTMLDivElement> = ({ target }) => {
    if (target instanceof Element && !target.closest('div.container')) {
      setModal(false);
    }
  };

  return (
    <motion.div //
      className='fixed w-full h-full top-0 bg-black/50'
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.2,
      }}
      onClick={closeModal}
    >
      <motion.div //
        className='bg-gray-300 w-4/5 h-full container px-4 py-2'
        initial={{
          x: '-100%',
        }}
        animate={{
          x: '0%',
        }}
        exit={{
          x: '-100%',
        }}
        transition={{
          type: 'tween',
        }}
      >
        <div className='flex items-center justify-between mb-2'>
          <Link to={'/'} className='block font-bold py-2 text-2xl'>
            연습용 Dnd
          </Link>
          <BsMoon className='mr-2' size={20} />
        </div>
        <Link to='/search' className='flex bg-gray-400 transition-[0.1s] rounded-full items-center gap-4 px-4 py-2'>
          <BsSearch />
          <p className='w-32 text-left text-gray-500'>검색해보기</p>
        </Link>
      </motion.div>
    </motion.div>
  );
};
export default Modal;
