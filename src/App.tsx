import { FC, useRef, useState } from "react";
const CURRENCY_BASE_URL =
	"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest";
const CURRENCIES = ["inr", "usd", "gbp", "eur"];

const getCurrencyRate = async (from: string, to: string) => {
	const res = await fetch(`${CURRENCY_BASE_URL}/currencies/${from}/${to}.json`);
	const data = await res.json();
	return data[to];
};

const App: FC = () => {
	const fromCurrencyRef = useRef<HTMLSelectElement>(null);
	const toCurrencyRef = useRef<HTMLSelectElement>(null);
	const amountRef = useRef<HTMLInputElement>(null);
	const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
	return (
		<div>
			<input placeholder="enter amount" ref={amountRef} />
			<span>from</span>
			<select ref={fromCurrencyRef}>
				{CURRENCIES.map((currency, index) => (
					<option key={index} value={currency}>
						{currency.toUpperCase()}
					</option>
				))}
			</select>
			<span>to</span>
			<select ref={toCurrencyRef}>
				{CURRENCIES.map((currency, index) => (
					<option key={index} value={currency}>
						{currency.toUpperCase()}
					</option>
				))}
			</select>
			<button
				className="btn btn-primary btn-sm"
				onClick={async () => {
					const fromValue = fromCurrencyRef.current?.value;
					const toValue = toCurrencyRef.current?.value;
					const amount = amountRef.current?.value;
					if (fromValue && toValue && amount) {
						const currencyValue: number = await getCurrencyRate(
							fromValue,
							toValue
						);
						if(parseInt(amount)){
							const convertedAmount: number = parseInt(amount) * currencyValue;
							setConvertedAmount(convertedAmount.toFixed(2));
						}else alert("amount should be a number");
					}
				}}
			>
				Get Rate
			</button>
			{convertedAmount && <div>Converted amount is: {convertedAmount}</div>}
		</div>
	);
};

export default App;
