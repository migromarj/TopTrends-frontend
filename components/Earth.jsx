import React, { useRef, useEffect, useState } from 'react'
import Footer from './Footer'

let Globe = () => null
if (typeof window !== 'undefined') Globe = require('react-globe.gl').default

export default function Earth(props) {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	})

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}

		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

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
				{ lat: props.lat, lng: props.lng, altitude: 1 },
				1000
			)
		}
	}, [props.rotate, props.autoFocus, props.lat, props.lng])

	return (
		<span id='background'>
			<React.Suspense fallback={<div>Loading...</div>}>
				<Globe
					ref={globeE1}
					width={windowSize.width}
					height={windowSize.height}
					globeImageUrl='//unpkg.com/three-globe/example/img/earth-night.jpg'
					bumpImageUrl='//unpkg.com/three-globe/example/img/earth-topology.png'
					backgroundImageUrl='//unpkg.com/three-globe/example/img/night-sky.png'
				/>
				{props.rotate && <Footer absolute />}
			</React.Suspense>
		</span>
	)
}
