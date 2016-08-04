const PromiseResolver = {
  call: (resolve, reject) => {
    return (err, req, res) => err ? reject(err) : resolve(res);
  }
};

export default PromiseResolver;
