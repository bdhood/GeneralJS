// import FU

π = Math.PI
log = console.log
srfy = JSON.stringify
log('init pt.js')

pt = PT = {}

// c = mat a b
PT.sum = (a,b,l) => {
  var p = []
  FU.forlen(l || (a.length > b.length ? a : b).length,
    i => p[i] = (a[i] || 0) + (b[i] || 0))
  return p
  }
PT.sub = (a,b,l) => {
  var p = []
  FU.forlen(l || (a.length > b.length ? a : b).length,
    i => p[i] = (a[i] || 0) - (b[i] || 0))
  return p
}
PT.mul = (a,b,l) => {
  var p = []
  FU.forlen(l || (a.length > b.length ? a : b).length,
    i => p[i] = (a[i] || 0) * (b[i] || 0))
  return p
}
PT.div = (a,b,l) => {
  var p = []
  FU.forlen(l || (a.length > b.length ? a : b).length,
    i => p[i] = (a[i] || 0) / (b[i] || 0))
  return p
}
PT.mat = (a,b,f,l) => {
  var p = []
  FU.forlen(l || (a.length > b.length ? a : b).length,
    i => p[i] = f(a[i] || 0, b[i] || 0, i))
  return p
}

// a = mat a b i
PT.sume = (a,b,l) => {
  FU.forlen(l || (a.length > b.length ? a : b).length,
    i => a[i] = (a[i] || 0) + (b[i] || 0))
  return a
}
PT.sube = (a,b,l) => {
  FU.forlen(l || (a.length > b.length ? a : b).length,
    i => a[i] = (a[i] || 0) - (b[i] || 0))
  return a
}
PT.mule = (a,b,l) => {
  FU.forlen(l || (a.length > b.length ? a : b).length,
    i => a[i] = (a[i] || 0) * (b[i] || 0))
  return a
}
PT.dive = (a,b,l) => {
  FU.forlen(l || (a.length > b.length ? a : b).length,
    i => a[i] = (a[i] || 0) / (b[i] || 0))
  return a
}
PT.mate = (a,b,f,l) => {
  FU.forlen(l || (a.length > b.length ? a : b).length,
    i => a[i] = f(a[i] || 0, b[i] || 0, i))
  return a
}

// c = mat a s i
PT.sums = (a,s,l) => {
  var p = []
  FU.forlen(l || a.length, i => p[i] = (a[i] || 0) + s)
  return p
}
PT.subs = (a,s,l) => {
  var p = []
  FU.forlen(l || a.length, i => p[i] = (a[i] || 0) - s)
  return p
}
PT.muls = (a,s,l) => {
  var p = []
  FU.forlen(l || a.length, i => p[i] = (a[i] || 0) * s)
  return p
}
PT.divs = (a,s,l) => {
  var p = []
  FU.forlen(l || a.length, i => p[i] = (a[i] || 0) / s)
  return p
}
PT.mats = (a,s,f,l) => {
  var p = []
  FU.forlen(l || a.length, i => p[i] = f(a[i] || 0, s, i))
  return p
}

// a = mat a s
PT.sumse = (a,s,l) => {
  FU.forlen(l || a.length, i => a[i] = (a[i] || 0) + s)
  return a
}
PT.subse = (a,s,l) => {
  FU.forlen(l || a.length, i => a[i] = (a[i] || 0) - s)
  log(a,s)
  return a
}
PT.mulse = (a,s,l) => {
  FU.forlen(l || a.length, i => a[i] = (a[i] || 0) * s)
  return a
}
PT.divse = (a,s,l) => {
  FU.forlen(l || a.length, i => a[i] = (a[i] || 0) / s)
  return a
}
PT.matse = (a,s,f,l) => {
  FU.forlen(l || a.length, i => a[i] = f(a[i] || 0, s, i))
  return a
}

// s = (for i a (s = mat s i))
PT.suma = (a,s,l) => {
  s = s || 0
  FU.forlen(l || a.length, i => s += a[i] || 0)
  return s
}
PT.suba = (a,s,l) => {
  s = s || 0
  FU.forlen(l || a.length, i => s -= a[i] || 0)
  return s
}
PT.mula = (a,s,l) => {
  s = s || 0
  FU.forlen(l || a.length, i => s *= a[i] || 0)
  return s
}
PT.diva = (a,s,l) => {
  s = s || 0
  FU.forlen(l || a.length, i => s /= a[i] || 0)
  return s
}
PT.mata = (a,s,f,l) => {
  FU.forlen(l || a.length, i => s = f(a[i],s,i))
  return s
}


PT.matl = (l,f) => {
  var a = []
  FU.forlen(l, i => a[i] = f(i,l))
  return a
}
PT.matls = (l,s,f) => {
  var a = []
  FU.forlen(l, i => a[i] = f(i,s,l))
  return a
}
PT.matlse = (l,s,f) => {
  FU.forlen(l, i => s = f(i,s,l))
  return s
}

// removes trailing zeros
PT.short = p => {
  var l = -1
  FU.forlen(p.length, i => p[i] && (l = i))
  p.splice(l+1,p.length-l)
  return p
}
// returns a copy of p
PT.copy = (p,l) => {
  l = l || p.length
  var n = []
  FU.forlen(l, i => n[i] = (p[i] || 0))
  return n
}
// sets a to b
PT.apply = (a, b) => {
  a.splice(0,a.length)
  FU.forlen(b.length, i => a[i] = b[i])
  return a
}
// sets the valus of a to b
PT.set = (a, b, l) => {
  l = l || b.length
  a.splice(0,a.length)
  FU.forlen(l, i => a[i] = (b[i] || 0))
  return a
}
// returns 0 vector
PT.zero = () => []
// returns true if a & b are equal
PT.equal = (a,b) => {
  return !FU.trueif((a.length > b.length ? a : b).length,
    i => a[i] != b[i] && !a[i] != !b[i])
}
// returns random vector of length l
PT.rand = l => {
  var p = []
  FU.forlen(l, i => p[i] = Math.random())
  return p
}

PT.length = p => Math.sqrt(PT.suma(PT.mul(p,p)))

PT.unit = p => PT.divs(p,PT.length(p))

PT.dot = (a,b) => PT.suma(PT.mul(a,b))
PT.cat = function() {
  var a = []
  FU.forEach(arguments, i => a = a.concat(i))
  return a
}

PT.find = (p,f,l) => {
  l = l || p.length
  for (var i = 0; i < l; ++i) if (f(p[i] || 0, i, p, l)) return i
  return l
}
PT.sliceif = (p,f) => {
  for (var i = 0; i < p.length; ++i)
    if (f(p[i] || 0, i, p))
      p = p.slice(i--,1)
  return p
}
PT.spliceif = (p,f) => {
  for (var i = 0; i < p.length; ++i)
    if (f(p[i] || 0, i, p))
      p.splice(i--,1)
  return p
}
PT.color = p => PT.suma(PT.mats(p, 1, c => {
  c = c > 1 ? 1 : c < 0 ? 0 : c
  c = Math.floor(c * 255).toString(16)
  c = ('0' + c).slice(-2)
  return c
}, 4), '#')

PT_UNIQUE_KEYS = {}
PT.unique_key = l => PT.matlse(l,'',(n,s)=>s+FU.rand_char())

PT.drawLine = (g,a,b) => {
  g.beginPath()
  g.moveTo(a[0] || 0, a[1] || 0)
  g.lineTo(b[0] || 0, b[1] || 0)
  g.stroke()
}
PT.drawCircle = (g, p, r) => {
  if (!r) return
  g.beginPath()
  g.arc(p[0] || 0, p[1] || 0, r, 0, 2 * Math.PI)
  g.stroke()
}
PT.fillCircle = (g, p, r) => {
  if (!r) return
  g.beginPath()
  g.arc(p[0] || 0, p[1] || 0, r, 0, 2 * Math.PI)
  g.fill()
}
PT.drawSquare = (g, p, r) => {
  g.beginPath()
  g.rect((p[0] || 0) - r, (p[1] || 0) - r, 2*r, 2*r)
  g.stroke()
}
PT.fillSquare = (g, p, r) => {
  g.beginPath()
  g.rect((p[0] || 0) - r, (p[1] || 0) - r, 2*r, 2*r)
  g.fill()
}
PT.drawRect = (g, a, b) => {
  g.beginPath()
  g.rect(a[0] || 0, a[1] || 0, b[0] || 0, b[1] || 0)
  g.draw()
}
PT.fillRect = (g, a, b) => {
  g.beginPath()
  g.rect(a[0] || 0, a[1] || 0, b[0] || 0, b[1] || 0)
  g.fill()
}


/*
vector method compiler
s: sting of argument types
  'v': vector
  's': scaler
  examples:
    'vvvs'
    'vvss'
    'vs'
    'v'
f: function that rcvs
returns: a function that rcvs the arguments of type specified by s
  note: the argument list is terminated by an required length argument
    that defines the length of the returned value
  examples:
    vcc('vssv', f) -> (v1,s1,s2,v2,l) => {}
*/
PT.vcc = (s,f,l) => {
  if (!f) return ()=>[]
  else if (!s) {
    if (l == 1) return () => [f.apply(0,[])]
    else if (l > 1) return () => {
      var ans = []
      for (var i = 0; i < l; ++i)
        ans[i] = f.apply(i,[])
      return ans
    }
    else return len => {
      var ans = []
      for (var i = 0; i < len; ++i)
        ans[i] = f.apply(i,[])
      return ans
    }
  }
  else if (s.length == 1) {
    if (s == 'v') {
      if (l == 1) return v => [f.apply(0,v)]
      else if (l > 1) return v => {
        var ans = []
        for (var i = 0; i < l; ++i)
          ans[i] = f.apply(i,[v[i] || 0])
        return ans
      }
      else return (v,len) => {
        var ans = []
        for (var i = 0; i < len; ++i)
          ans[i] = f.apply(i,[v[i] || 0])
        return ans
      }
    }
    else if (l == 1) return s => [f.apply(l,[s || 0])]
    else if (l > 1) return s => {
      var ans = []
      s = s || 0
      for (var i = 0; i < l; ++i)
        ans[i] = f.apply(i,[s])
      return ans
    }
    else return (s,len) => {
      var ans = []
      s = s || 0
      for (var i = 0; i < len; ++i)
        ans[i] = f.apply(i,[s])
      return ans
    }
  }
  else if (l == 1) return function() {
    var arg = []
    for (var j = 0; j < s.length; ++j)
      arg[j] = arguments[j] ?
        s[j] == 'v' ?
          arguments[j][0] || 0 :
          arguments[j] : 0
    return [f.apply(0,arg)]
  }
  else if (l > 1) return function() {
    var ans = [], arg = []
    for (var i = 0; i < l; ++i) {
      for (var j = 0; j < s.length; ++j)
        arg[j] = arguments[j] ?
          s[j] == 'v' ?
            arguments[j][i] || 0 :
            arguments[j] : 0
      ans[i] = f.apply(i,arg)
    }
    return ans
  }
  else return function() {
    var len = arguments[s.length]
    var ans = [], arg = []
    for (var i = 0; i < len; ++i) {
      for (var j = 0; j < s.length; ++j)
        arg[j] = arguments[j] ?
          s[j] == 'v' ?
            arguments[j][i] || 0 :
            arguments[j] : 0
      ans[i] = f.apply(i,arg)
    }
    return ans
  }
}
PT.fcc = function() {



  return (s,f) => {

  }
}
