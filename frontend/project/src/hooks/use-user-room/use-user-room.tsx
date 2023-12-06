import { useState } from 'react';

function useUserRoom(){
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);

  const handleToggleFormEditable = (): void => {
    setIsFormEditable(!isFormEditable);
  };

  return {
    isFormEditable,
    handleToggleFormEditable
  };
}

export default useUserRoom;
