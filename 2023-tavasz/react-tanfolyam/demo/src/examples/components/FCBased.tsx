type MyProps = {
  text: string;
};

export function FCBased({ text }: MyProps) {
  return <h1>{text}</h1>;
}
