import Head from "next/head"

type Props = {
	children?: React.ReactNode
	title?: string
	content?: string
}

export default function Message({children, title, content}: Props) {
  return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='description' content={ content } />
				<meta charSet='utf-8' />
				<link rel='icon' href='/favicon.ico' />
				<title>{ title }</title>
			</Head>
			<div className="bg-gray-200 min-h-screen">
				<header className="flex items-center justify-center space-x-2 bg-gray-700 p-5 shadow w-full">
					<h1 className="text-white text-center text-2xl">Message App</h1>
				</header>
				<main className="min-h-screen">
					<div className="container mx-auto my-0">
						{ children }
					</div>
				</main>
				<footer className="flex items-center justify-center p-3">
					©2023 Message App
				</footer>
			</div>
		</>
	)
}