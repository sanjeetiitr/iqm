import React from "react";

const columns = [
  {
    key: "author",
    label: "Author",
  },
  {
    key: "title",
    label: "Title",
  },
  {
    key: "creation_date",
    label: "Creation Date",
  },
];

export const HeaderRow: React.FC<{}> = () => {
  return (
    <tr>
      {columns.map((col) => (
        <th key={col.key} className={col.key}>
          <div className={"middleAlign"}>{col.label}</div>
        </th>
      ))}
    </tr>
  );
};
