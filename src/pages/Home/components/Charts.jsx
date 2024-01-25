// import { useState, useEffect, useRef } from 'react'
// import axios from 'axios'
// import { Line } from 'react-chartjs-2'
// import Select from 'react-select'

// const CoinChart = () => {
// 	const [assets, setAssets] = useState([])
// 	const [selectedAssets, setSelectedAssets] = useState([])
// 	const [chartData, setChartData] = useState({})
// 	const hasFetchedAssets = useRef(false)
// 	const hasFetchedHistoricalData = useRef(false)

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				// Fetch the list of available assets from CoinAPI.io
// 				const response = await axios.get(
// 					'https://rest.coinapi.io/v1/assets',
// 					{
// 						headers: {
// 							Authorization: process.env.REACT_APP_COINAPIIO_KEY
// 						}
// 					}
// 				)

// 				// Extract relevant data from the response
// 				const availableAssets = response.data.map((asset) => ({
// 					label: asset.name,
// 					value: asset.asset_id
// 				}))

// 				setAssets(availableAssets)
// 			} catch (error) {
// 				console.error('Error fetching assets:', error)
// 			}
// 		}

// 		if (!hasFetchedAssets.current) {
// 			hasFetchedAssets.current = true // Update the ref to indicate that data has been fetched
// 			fetchData()
// 		}
// 	}, [])
// 	// useEffect(() => {
// 	// 	// Fetch the list of available assets from CoinAPI.io
// 	// 	const fetchAssets = async () => {
// 	// 		try {
// 	// 			hasFetchedAssets.current = true // Update the ref to indicate that data has been fetched
// 	// 			const response = await axios.get(
// 	// 				'https://rest.coinapi.io/v1/assets',
// 	// 				{
// 	// 					headers: {
// 	// 						Authorization: process.env.REACT_APP_COINAPIIO_KEY
// 	// 					}
// 	// 				}
// 	// 			)

// 	// 			// Extract relevant data from the response
// 	// 			const availableAssets = response.data.map((asset) => ({
// 	// 				label: asset.name,
// 	// 				value: asset.asset_id
// 	// 			}))

// 	// 			setAssets(availableAssets)
// 	// 		} catch (error) {
// 	// 			console.error('Error fetching assets:', error)
// 	// 		}
// 	// 	}

// 	// 	// Check if assets have not been fetched yet
// 	// 	if (!hasFetchedAssets.current) {
// 	// 		fetchAssets()
// 	// 	}
// 	// }, []) // Empty dependency array ensures that this effect runs only once

// 	// useEffect(() => {
// 	// 	if (selectedAssets.length === 2 && !hasFetchedHistoricalData.current) {
// 	// 		// Fetch historical data for the selected assets
// 	// 		const fetchHistoricalData = async () => {
// 	// 			const [asset1, asset2] = selectedAssets
// 	// 			const promises = selectedAssets.map((asset) =>
// 	// 				axios.get(
// 	// 					`https://rest.coinapi.io/v1/ohlcv/${asset.value}/USD/history?period_id=1DAY&time_start=2022-01-01T00:00:00&limit=30`,
// 	// 					{
// 	// 						headers: {
// 	// 							Authorization:
// 	// 								process.env.REACT_APP_COINAPIIO_KEY
// 	// 						}
// 	// 					}
// 	// 				)
// 	// 			)

// 	// 			try {
// 	// 				const [response1, response2] = await Promise.all(promises)

// 	// 				// Extract relevant data for the chart
// 	// 				const chartData = {
// 	// 					labels:
// 	// 						response1.data?.map(
// 	// 							(entry) => entry.time_period_start
// 	// 						) || [],
// 	// 					datasets: [
// 	// 						{
// 	// 							label: asset1.label,
// 	// 							data:
// 	// 								response1.data?.map(
// 	// 									(entry) => entry.price_close
// 	// 								) || [],
// 	// 							borderColor: 'rgba(75,192,192,1)',
// 	// 							borderWidth: 2,
// 	// 							fill: false
// 	// 						},
// 	// 						{
// 	// 							label: asset2.label,
// 	// 							data:
// 	// 								response2.data?.map(
// 	// 									(entry) => entry.price_close
// 	// 								) || [],
// 	// 							borderColor: 'rgba(255,99,132,1)',
// 	// 							borderWidth: 2,
// 	// 							fill: false
// 	// 						}
// 	// 					]
// 	// 				}

// 	// 				setChartData(chartData)
// 	// 				hasFetchedHistoricalData.current = true // Update the ref to indicate that data has been fetched
// 	// 			} catch (error) {
// 	// 				if (error.response && error.response.status === 429) {
// 	// 					// If rate-limited, handle as needed
// 	// 					console.warn(
// 	// 						'Rate limited, consider implementing retry logic'
// 	// 					)
// 	// 				} else {
// 	// 					console.error('Error fetching historical data:', error)
// 	// 				}
// 	// 			}
// 	// 		}

// 	// 		fetchHistoricalData()
// 	// 	}
// 	// }, [selectedAssets])

// 	const handleAssetChange = (selectedOptions) => {
// 		setSelectedAssets(selectedOptions)
// 	}

// 	return (
// 		<div>
// 			<h1>CoinAPI.io Asset Chart</h1>
// 			<Select
// 				options={assets}
// 				isMulti
// 				onChange={handleAssetChange}
// 				value={selectedAssets}
// 			/>
// 			{selectedAssets.length === 2 && (
// 				<Line data={chartData} height={400} width={600} />
// 			)}
// 		</div>
// 	)
// }

// export default CoinChart
