type MoneyType = "ALL" | "RUBLS" | "Dollars";

type MoneyArr = {
  banknots: string;
  value: number;
  number: string;
}

type NewComponentPropsType = {
  currentMoney: MoneyArr[];
  onClickFilterHundler: (banknote: MoneyType) => void;
};

export const NewComponent = ({ currentMoney, onClickFilterHundler }: NewComponentPropsType) => {
  return (
    <>
      <ul>
        {currentMoney.map((objFromMoney, index) => {
          return (
            <li key={index}>
              <span>{objFromMoney.banknots}</span>
              <span>{objFromMoney.value}</span>
              <span>{objFromMoney.number}</span>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => onClickFilterHundler("ALL")}>ALL</button>
        <button onClick={() => onClickFilterHundler("RUBLS")}>RUBLS</button>
        <button onClick={() => onClickFilterHundler("Dollars")}>Dollars</button>
      </div>
    </>
  );
};