function Finput({ifor,r}) {
  return (
    <>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Enter {ifor}</span>
          {r &&
          <span className="label-text-alt">required</span>
          }
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
    </>
  );
}
export default Finput;
