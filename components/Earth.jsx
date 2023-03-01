import { useRef, useEffect } from 'react'

let Globe = () => null
if (typeof window !== 'undefined') Globe = require('react-globe.gl').default

export default function Earth(props) {
	const globeE1 = useRef()

	useEffect(() => {
		if (props.rotate) {
			globeE1.current.controls().autoRotate = true
		} else {
			globeE1.current.controls().autoRotate = false
		}
		globeE1.current.controls().autoRotateSpeed = 0.5
		globeE1.current.controls().enableZoom = false
		globeE1.current.controls().enabled = false
		if (props.autoFocus) {
			globeE1.current.pointOfView(
				{ lat: props.lat, lng: props.lng, altitude: 1.8 },
				1000
			)
		}
	}, [props.rotate, props.autoFocus, props.lat, props.lng])

	return (
		<Globe
			ref={globeE1}
			globeImageUrl='//unpkg.com/three-globe/example/img/earth-night.jpg'
			bumpImageUrl='//unpkg.com/three-globe/example/img/earth-topology.png'
			backgroundImageUrl='//unpkg.com/three-globe/example/img/night-sky.png'
		/>
	)
}
