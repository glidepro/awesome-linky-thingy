import { useState, useEffect } from 'react';
import NextError from 'next/error';
import { StatusCodes } from 'http-status-codes';
import ProfileContainer from '../layout/ProfileContainer';
import Head from 'next/head';

const backgroundImageSrc = (width, height) => {
  if (width && height) {
    return `https://source.unsplash.com/${width}x${height}/?night`;
  }

  // transparent image
  return 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
}

const Profile = props => {
  // saves us from having to do any undefined check on 'window'
  const [ innerWidth, setInnerWidth ] = useState(0);
  const [ innerHeight, setInnerHeight ] = useState(0);
  useEffect(() => {
    setInnerWidth(window.innerWidth);
    setInnerHeight(window.innerHeight);
  });

  const { error, profile, profileName } = props;

  if (error) {
    return <NextError statusCode={error.statusCode} title={error.title} />;
  }

  const profileImageSize = 96;

  const rows = [
    {
      template: '35px',
      content: () => null,
    },
    {
      template: `${profileImageSize}px`,
      content: () => (
        <div css={{ placeSelf: 'center' }}>
          <img
            src={`https://source.unsplash.com/${profileImageSize * 2}x${profileImageSize * 2}/?face`}
            alt={`Profile image for ${profileName}`}
            css={{
              width: `${profileImageSize}px`,
              height: `${profileImageSize}px`,
              borderRadius: '999px',
            }}
          />
        </div>
      ),
    },
    {
      template: '10px',
      content: () => null,
    },
    {
      template: '30px',
      content: () => (
        <div css={{ placeSelf: 'center' }}>
          <div css={{textAlign: 'center', color: 'white' }}>@{profileName}</div>
        </div>
      ),
    },
    {
      template: '15px',
      content: () => null,
    },
  ];

  const linkHeightPx = 65;
  const { links } = profile;

  if (links) {
    links.forEach((l) => {
      rows.push({
        template: `${linkHeightPx + (2 * 10)}px`,
        content: () => (
          <a css={{ textDecoration: 'none' }} href={l.url} rel='noopener' target='_blank'>
            <div
              key={`link-${l.id}`}
              css={{
                display: 'grid',
                gridTemplateColumns: '10px auto 10px',
                gridTemplateRows: `10px ${linkHeightPx}px 10px`,
              }}
            >
              <div
                css={{
                  display: 'grid',
                  gridColumnStart: 2,
                  gridColumnEnd: 3,
                  gridRowStart: 2,
                  gridRowEnd: 3,
                  gridTemplateColumns: 'auto 1fr auto',
                  gridTemplateRows: 'auto',
                  outline: '2px solid white',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  color: 'white',
                  ':hover': {
                    backgroundColor: 'white',
                    color: 'black',
                  },
                  transform: 'translate3d(0, 0, 0)',
                  transition: 'all 0.25s',
                }}
              >
                <div
                  css={{
                    display: 'grid',
                    gridColumnStart: 1,
                    gridColumnEnd: 2,
                    placeSelf: 'center',
                    padding: '4px',
                  }}
                >
                  <img
                    src={`https://source.unsplash.com/${(linkHeightPx * 2) - 8}x${(linkHeightPx * 2) - 8}/?water`}
                    css={{
                      width: `${linkHeightPx - 8}px`,
                      height: `${linkHeightPx - 8}px`,
                      borderRadius: '999px',
                    }}
                  />
                </div>
                <div css={{ display: 'grid', gridColumnStart: 2, gridColumnEnd: 3, placeSelf: 'center', textAlign: 'center', padding: '5px' }}>
                  {l.title}
                </div>
                <div css={{ display: 'grid', gridColumnStart: 3, gridColumnEnd: 4, placeSelf: 'center' }}>
                  <div css={{ width: `${linkHeightPx}px`, height: `${linkHeightPx}px`, visibility: 'hidden' }}></div>
                </div>
              </div>
            </div>
          </a>
        ),
      });
    });
  }

  return (
    <>
      <Head>
        <title>Awesome Linky Thingy | {profileName}</title>
        <meta name='description' content='Awesome Linky Thingy'></meta>
      </Head>
      <ProfileContainer
        rows={rows}
        backgroundImage={() => {
          // bit of fun with the blur, probably going a bit far...!
          const blurPx = 12;

          return (
            <img
              src={backgroundImageSrc(parseInt(innerWidth / (blurPx / 4), 10), parseInt(innerHeight / (blurPx / 4), 10))}
              alt={`Background image for ${profileName}`}
              css={{
                position: 'fixed',
                width: `calc(100% + ${blurPx * 4}px)`,
                height: `calc(100vh + ${blurPx * 4}px)`,
                top: `-${blurPx * 2}px`,
                left: `-${blurPx * 2}px`,
                zIndex: -100,
                objectFit: 'cover',
                objectPosition: 'center',
                filter: `blur(${blurPx}px)`,
              }}
            />
          )
        }}
      />
    </>
  );
}

export default Profile;

export async function getServerSideProps(context) {
  try {
    // imagine the object below is being loaded from an external source

    return {
      props: {
        profileName: context.params.profile,
        profile: {
          links: [{
            id: 'c490f22a-477c-4504-8db2-f3a9a9bf4eb0',
            title: '🎹 Latest Tunes 🎹',
            url: 'https://soundcloud.com/user-92404752',
          }, {
            id: 'dd1c1afb-a952-4ad9-afab-9d4577e44ec7',
            title: '🎹 Slightly Older Tunes 🎹',
            url: 'https://soundcloud.com/glidepro',
          }, {
            id: '291ea290-9723-4a77-9390-6b10059eaaa4',
            title: '🚧 Disperse - Site Builder Site Project 🚧',
            url: 'https://brooklyn.dsprs.me/',
          }],
        },
      },
    };
  } catch (e) {
    return {
      props: {
        error: {
          statusCode: StatusCodes.NOT_FOUND,
          title: 'Whoops, no profile found here',
        },
      },
    };
  }
}
