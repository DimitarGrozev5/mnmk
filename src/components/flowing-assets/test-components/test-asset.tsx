type TestAssetProps = {
  children: string;
};
const TestAsset: React.FC<TestAssetProps> = ({ children }) => (
  <div>{children}</div>
);
export default TestAsset;
