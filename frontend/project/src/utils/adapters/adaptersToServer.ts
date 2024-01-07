export const adaptAvatarToServer =
  (file: File) => {
    const formData = new FormData();
    formData.set('avatar', file);

    return formData;
  };
