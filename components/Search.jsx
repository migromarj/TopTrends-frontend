import { useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import Link from 'next/link'
import Image from 'next/image'
import { useCountries } from '../services/services'

const AutocompleteItem = ({ name, acronym, flag, woeid, pn }) => {
	return (
		<li className='m-1 rounded-xl border-2 border-black bg-purple-200'>
			<Link id={`search-${acronym}`} href={`/trends/${acronym}`}>
				<div className='m-2 flex gap-4'>
					<div className='flex items-center'>
						<Image
							src={flag}
							alt={`${name} flag`}
							width={30}
							height={20}
							className='mr-2'
						/>
						<p className='hidden font-bold text-black sm:block'>{name}</p>
					</div>
					<div className='w-full content-end items-center justify-end sm:flex'>
						<p className='visible m-1 text-center font-bold text-black sm:hidden'>
							{name}
						</p>
						<div className='flex items-center justify-center sm:justify-end'>
							{woeid && (
								<Image
									src='/images/twitter-icon.png'
									alt='Twitter Icon'
									width={20}
									height={20}
									className='m-1'
								/>
							)}
							{pn && (
								<Image
									src='/images/google-icon.png'
									alt='Google Icon'
									width={20}
									height={20}
									className='m-1'
								/>
							)}
							<Image
								src='/images/youtube-icon.png'
								alt='YouTube Icon'
								width={20}
								height={20}
								className='m-1'
							/>
						</div>
					</div>
				</div>
			</Link>
		</li>
	)
}

export default function Search(props) {
	const [autocompleteState, setAutocompleteState] = useState({
		collections: [],
		isOpen: false,
	})

	const { data } = useCountries()

	const autocomplete = useMemo(
		() =>
			createAutocomplete({
				placeholder: 'Search for a country',
				onStateChange: ({ state }) => setAutocompleteState(state),
				getSources: () => [
					{
						sourceId: 'countries',
						getItems: ({ query }) => {
							if (!query || !data) {
								return []
							}

							return data.allCountries.filter(country => {
								return (
									(country.woeid || country.pn) &&
									country.name.toLowerCase().includes(query.toLowerCase())
								)
							})
						},
					},
				],
				...props,
			}),
		[props, data]
	)

	const formRef = useRef(null)
	const inputRef = useRef(null)
	const panelRef = useRef(null)

	const formProps = autocomplete.getFormProps({
		inputElement: inputRef.current,
	})

	const inputProps = autocomplete.getInputProps({
		inputElement: inputRef.current,
	})

	return (
		<form ref={formRef} {...formProps}>
			<div className='relative w-60 sm:w-96'>
				<input
					ref={inputRef}
					className='w-full rounded-full border-2 border-black bg-purple-100 p-2 pl-4'
					{...inputProps}
					aria-labelledby='autocomplete-1-label'
					id='autocomplete-1-label'
				/>
				{autocompleteState.isOpen && (
					<div
						className='absolute top-0 left-0 z-10 mt-12 max-h-52 w-full overflow-y-auto rounded-xl border-x-2 border-b-2 border-black bg-purple-400 p-2'
						ref={panelRef}
						{...autocomplete.getPanelProps()}
					>
						{autocompleteState.collections.map((collection, index) => {
							const { items } = collection

							return (
								<section id='countryList' key={`section-${index}`}>
									{items.length > 0 && (
										<ul {...autocomplete.getListProps()}>
											{items.map((item, index) => (
												<AutocompleteItem key={index} {...item} />
											))}
										</ul>
									)}
								</section>
							)
						})}
					</div>
				)}
			</div>
		</form>
	)
}
