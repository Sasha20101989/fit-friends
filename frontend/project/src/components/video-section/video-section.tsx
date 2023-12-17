import { useAppSelector } from '../../hooks/index';
import { getCurrentRole } from '../../store/main-process/main-process.selectors';
import { Role } from '../../types/role.enum';
import Image from '../image/image';

type VideoSectionProps = {
  isInBalance: boolean;
}

function VideoSection({isInBalance}: VideoSectionProps):JSX.Element {
  const currentRole = useAppSelector(getCurrentRole);

  return (
    <div className="training-video">
      <h2 className="training-video__title">Видео</h2>
      <div className="training-video__video">
        <Image imageSrc={'img/content/training-video/video-thumbnail'} sourceName={'training-video__thumbnail'} width={922} height={566} alt={'Обложка видео'} />
        <button className="training-video__play-button btn-reset" disabled={!isInBalance}>
          <svg width="18" height="30" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      {currentRole === Role.Trainer && (
        <div className="training-video__drop-files">
          <form action="#" method="post">
            <div className="training-video__form-wrapper">
              <div className="drag-and-drop">
                <label>
                  <span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или MP4
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-import-video"></use>
                    </svg>
                  </span>
                  <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4" />
                </label>
              </div>
            </div>
          </form>
        </div>
      )}
      <div className="training-video__buttons-wrapper">
        <button
          className="btn training-video__button training-video__button--start"
          type="button"
          disabled={!isInBalance}
        >
          Приступить
        </button>
        {currentRole === Role.Trainer && (
          <div className="training-video__edit-buttons">
            <button className="btn" type="button">Сохранить</button>
            <button className="btn btn--outlined" type="button">Удалить</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoSection;
