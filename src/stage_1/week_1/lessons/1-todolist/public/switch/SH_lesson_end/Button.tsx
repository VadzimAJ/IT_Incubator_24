type ButtonPropsType = {
	title: string
	onClick?:()=> void
	disabled?: boolean

}

export const Button = ({title, disabled, onClick}: ButtonPropsType) => {
	return (
		<button disabled ={disabled} onClick={onClick}>{title}</button>
	)
}
