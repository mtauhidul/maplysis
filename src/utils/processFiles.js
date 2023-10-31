export const processFiles = (rows) => {
  const zipIndex = rows[0].findIndex((item) =>
    item.toLowerCase().includes('zip')
  );
  const dreIndex = rows[0].findIndex((item) =>
    item.toLowerCase().includes('dre')
  );
  const targetIndex = rows[0].findIndex((item) =>
    item.toLowerCase().includes('target')
  );

  const data = rows.slice(1).map((row) => {
    return {
      zip: row[zipIndex],
      dre: row[dreIndex],
    };
  });

  const targetData = rows.slice(1).map((row) => {
    return {
      zip: row[targetIndex],
    };
  });

  const targetDataFiltered = targetData.filter((item) => item.target !== null);

  return {
    data,
    targetData: targetDataFiltered,
  };
};
