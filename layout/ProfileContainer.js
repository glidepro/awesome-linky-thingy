import { Global } from '@emotion/react';

const ProfileContainer = props => {
  const { backgroundImage, rows } = props;
  const centreColumn = 2;

  return (
    <>
      {backgroundImage()}
      <Global
        styles={{
          body: {
            margin: 0,
            padding: 0,
            fontFamily: "'Open Sans', sans-serif",
            backgroundColor: 'black',
          },
          '*:not(input, textarea)': {
            userSelect: 'none',
          },
        }}
      />
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: `1fr minmax(auto, 640px) 1fr`,
          gridTemplateRows: rows.map(r => r.template).join(' '),
        }}
      >
        {rows.map((r, i) => {
          const { content } = r;
          const row = i + 1;

          return (
            <div
              key={i}
              css={{
                gridColumnStart: centreColumn,
                gridColumnEnd: centreColumn + 1,
                gridRowStart: row,
                gridRowEnd: row + 1,
                display: 'grid',
              }}
            >
              {content()}
            </div>
          )
        })}
      </div>
    </>
  );
}

export default ProfileContainer;
