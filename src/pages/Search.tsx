import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Search = () => {
  return (
    <>
      <div className='mx-auto max-w-[1280px] px-4 w-full flex items-center gap-4'>
        <Link to={'/'}>
          <BiArrowBack size={30} />
        </Link>
        <div className='w-4/5 sm:w-1/2 py-4'>
          <input type='text' placeholder='검색하기...' className='block w-full bg-transparent border-b border-black p-2 focus:outline-none' />
        </div>
      </div>
    </>
  );
};
export default Search;
