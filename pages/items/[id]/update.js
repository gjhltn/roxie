import * as React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { ItemEditPage as Page } from '/components'
import fetcher from '/helpers/fetcher'

const Update = () => {
	const router = useRouter()
	const { id } = router.query

	const { data, error } = useSWR(`/api/items/${id}`, fetcher)

	if (error) return <div>Error [{JSON.stringify(error)}]</div>
	if (!data) return <div>Loading...</div>

	return <Page itemTypeName={data.type} id={id} item={data} />
}

export default Update

export async function getServerSideProps(context) {
	return {
		props: {}
	}
}
