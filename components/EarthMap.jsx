import dynamic from 'next/dynamic'

const Earth = dynamic(() => import('./Earth'), {
	ssr: false,
})

export default function EarthMap({ lat, lng, children }) {
  return (
    <div>
      <div className='fixed'>
        <Earth autoFocus lat={lat} lng={lng} />
      </div>
      <div className='absolute w-full'>
        {children}
      </div>
    </div>
  );
}