import { FC } from "react";

interface SectionCreatorItemProps {
  sectionName: string;
  onClickHandler?: (...args: any[]) => any;
  btnText: string;
}

export const SectionCreatorItem: FC<SectionCreatorItemProps> = ({ sectionName, onClickHandler, btnText }) => {
  return (
    <div className="section">
      <div className="section-header">{sectionName}</div>
      <div className="actions">
        <button className="action" onClick={onClickHandler}>
          {btnText}
        </button>
      </div>
    </div>
  );
};
