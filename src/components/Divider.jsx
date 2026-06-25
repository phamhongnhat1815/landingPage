/**
 * Divider component – pure CSS diamond, không dùng Unicode ký tự đặc biệt.
 * @param {boolean} light  - true khi dùng trên nền tối
 */
export default function Divider({ light = false }) {
  return (
    <div className="divider">
      <span
        className="divider-dot"
        aria-hidden="true"
        style={light ? { background: 'rgba(255,255,255,0.25)' } : {}}
      />
    </div>
  )
}
