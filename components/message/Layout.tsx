import Link from "next/link";
import Image from 'next/image'
import Head from "next/head"

type Props = {
	children?: React.ReactNode
	title?: string
	content?: string
}

export default function Message( {children, title, content}: Props) {
  return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='description' content={ content } />
				<meta charSet='utf-8' />
				<link rel='icon' href='/favicon.ico' />
				<title>{ title }</title>
			</Head>
			<div className="wrapper">
				<header>
					<h1>{ title }</h1>
				</header>
				<main>
					<div className="container">
						{ children }
					</div>
				</main>
				<footer>
					©2023 { title }
				</footer>
			</div>
		</>
  )
}