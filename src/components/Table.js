const Table = ({children, last=""}) => {
  return (
    <table className='table'>
      <thead className='thead-dark'>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Questionaire Title</th>
          <th scope='col'>Duration</th>
          <th scope='col'>Designated Time</th>
          <th scope='col'>Subject</th>
          <th scope='col'>Teacher</th>
          <th scope='col'>Approval</th>
          <th scope='col'>{last}</th>
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  );
};

export default Table;
