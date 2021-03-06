import * as Hero from "components/Heroicons"
import IconView from "./IconView" // FIXME
import originalIcons from "./originalIcons" // FIXME
import React from "react"

import { ReactComponent as GitHubLogo } from "svg/github.svg"
import { ReactComponent as TwitterLogo } from "svg/twitter.svg"

const Container = props => (
	<div className="py-32 flex flex-row justify-center bg-gray-100 min-h-full">
		<div className="px-6 w-full max-w-screen-xl">
			{props.children}
		</div>
	</div>
)

// {/* <a className="text-md-blue-a200" href="https://github.com/codex-src/heroicons-viewer">Contribute</a> on GitHub */}
const App = props => {
	const ref = React.useRef()
	const lhs = React.useRef()
	const rhs = React.useRef()

	const [value, setValue] = React.useState("")
	const [solid, setSolid] = React.useState(false)
	const [icons, setIcons] = React.useState(originalIcons)

	React.useLayoutEffect(() => {
		const w1 = lhs.current.getBoundingClientRect().width
		const w2 = rhs.current.getBoundingClientRect().width
		ref.current.style.padding = `0px ${w2}px 0px ${w1}px`
	}, [])

	React.useEffect(() => {
		const id = setTimeout(() => {
			const query = value.toLowerCase()
			const filteredIcons = originalIcons.filter(each => each.name.includes(query))
			setIcons(filteredIcons)
		}, 25)
		return () => {
			clearTimeout(id)
		}
	}, [value])

	const handleKeyDown = e => {
		if (e.keyCode !== 27) {
			// No-op
			return
		}
		setValue("")
	}

	return (
		<Container>

			{/* H1 */}
			<h1 className="text-center font-dm-sans font-bold text-5xl tracking-tighter">
				Heroicons
			</h1>

			{/* H2 */}
			<div className="h-3" />
			<h2 className="text-center font-medium text-xl -tracking-px leading-relaxed text-gray-800">
				<a className="text-md-blue-a200" href="https://github.com/refactoringui/heroicons">
					Free, open source icons
				</a>{" "}
				by{" "}
				<a className="text-md-blue-a200" href="https://twitter.com/steveschoger">
					Steve Schoger{" "}
					<TwitterLogo className="-mt-1 mx-1 inline-block w-5 h-5 text-blue-500" />
				</a>
				{/* and{" "} */}
				{/* <a className="text-md-blue-a200" href="https://twitter.com/adamwathan"> */}
				{/* 	Adam W<span className="sm:hidden">.</span><span className="hidden sm:inline">athan</span>{" "} */}
				{/* 	<TwitterLogo className="-mt-1 mx-1 inline-block w-5 h-5 text-blue-500" /> */}
				{/* </a> */}
				<br />
				<a className="text-md-blue-a200" href="https://github.com/codex-src/heroicons-viewer">
					Web app
				</a>{" "}
				by{" "}
				<a className="text-md-blue-a200" href="https://twitter.com/username_ZAYDEK">
					Zaydek MG{" "}
					<TwitterLogo className="-mt-1 mx-1 inline-block w-5 h-5 text-blue-500" />
				</a>
			</h2>

			<div className="h-12" />
			<div className="flex flex-row justify-center">
				<button className="px-4 py-3 flex flex-row justify-center items-center rounded-lg shadow-xs">
					<p className="font-semibold text-lg text-md-blue-a200">
						Download
					</p>
				</button>
			</div>

			{/* Search */}
			<div className="h-6" />
			<div className="-mx-6 mb-6 p-6 pb-0 sticky top-0 bg-gray-100 z-40">
				<div className="relative flex flex-row justify-between items-center">

					{/* LHS: */}
					<div ref={lhs} className="px-6 z-10 pointer-events-none">
						<Hero.SearchOutlineMd className="w-6 h-6 text-gray-500" />
					</div>

					<div className="absolute inset-0">
						<input ref={ref} className="w-full h-full text-xl bg-white rounded-lg outline-none shadow-hero focus:shadow-outline trans-150" type="text" placeholder="Search 140 icons…" value={value} onKeyDown={handleKeyDown} onChange={e => setValue(e.target.value)} />
					</div>

					{/* RHS: */}
					<div ref={rhs} className="relative z-10 rounded-l-none rounded-r-lg">
						<button className="pl-6 py-4 text-xl bg-transparent rounded-l-none rounded-r-lg focus:outline-none focus:shadow-outline trans-150 cursor-pointer w-40" style={{ paddingRight: "3.75rem" }} onClick={e => setSolid(!solid)}>
							{ solid ? "Solid" : "Outline"}
						</button>
						<div className="px-6 absolute right-0 inset-y-0 flex flex-row items-center pointer-events-none">
              {/* <Hero.SwitchHorizontal_md className="w-6 h-6 text-gray-500" /> */}
              <Hero.SelectorOutlineMd className="w-6 h-6 text-gray-500" />
						</div>
					</div>

				</div>
 			</div>
			<div className="mt-6">
				<IconView icons={icons} solid={solid} />
			</div>

		</Container>
	)
}

export default App
