import { expect, assert } from 'chai'

import * as solution from '../src/index'

describe('TypeScript workshop', () => {
  describe('addArrays', () => {
    it('should add the two arrays\' values', () => {
      const result = solution.addArrays([1, 2, 3], [4, 5, 6])
      expect(result).to.equal(21)
    })
  })

  describe('addTo', () => {
    it('should add a number to every item of the array', () => {
      const fixture = solution.addTo([1, 2, 3, 4], 5)
      expect(fixture).to.eql([6, 7, 8, 9])
    })
  })

  describe('sortUsers', () => {
    it('should sort users array by age', () => {
      const fixture = solution.sortUsers(
        [
          {
            age: 5,
            name: 'asd'
          },
          {
            age: 23,
            name: 'lol'
          },
          {
            age: 2,
            name: 'reee'
          },
          {
            age: 12,
            name: 'aaaaaaa'
          }
        ])
      expect(fixture).to.eql([
        {
          age: 2,
          name: 'reee'
        },
        {
          age: 5,
          name: 'asd'
        },
        {
          age: 12,
          name: 'aaaaaaa'
        },
        {
          age: 23,
          name: 'lol'
        },
      ])
    })
  })

  describe('section', () => {
    it('should create the intersection', () => {
      const fixture = solution.section([1, 2, 3, 4, 5], 2, 5)
      expect(fixture).to.eql([3, 4, 5])
    })
  })

  describe('reverse', () => {
    it('should reverse the string', () => {
      const fixture = solution.reverse('hello world')
      expect(fixture).to.equal('dlrow olleh')
    })
  })

  describe('filterFalsy', () => {
    it('should filter falsy values', () => {
      const fixture = solution.filterFalsy([
        {}, [], 0, 34, false, '', { foo: 'bar' }, [1, 2], null, true, undefined
      ])
      expect(fixture).to.eql([
        {}, [], 34, { foo: 'bar' }, [1, 2], true
      ])
    })
  })

  describe('max', () => {
    it('should return the max value', () => {
      const fixture = solution.max([1, 5, 987, 0, -12])
      expect(fixture).to.equal(987)
    })
  })

  describe('reverseWords', () => {
    it('should reverse words one-by-one', () => {
      assert.equal(solution.reverseWords('The quick brown fox jumps over the lazy dog.'), 'ehT kciuq nworb xof spmuj revo eht yzal .god');
      assert.equal(solution.reverseWords('apple'), 'elppa');
      assert.equal(solution.reverseWords('a b c d'), 'a b c d');
      assert.equal(solution.reverseWords('double  spaced  words'), 'elbuod  decaps  sdrow');
    })
  })

  describe('withoutSecondAndThird', () => {
    it('should return the array without the second and third items', () => {
      assert.deepEqual(solution.withoutSecondAndThird([1, 2, 3, 4, 5]), [1, 4, 5])
    })
  })

  describe('capitalize', () => {
    it('should capitalize each word', () => {
      assert.equal(solution.capitalize('this is a sentence'), 'This Is A Sentence')
    })
  })

  describe('reverseWords', () => {
    it('should reverse every word', () => {
      assert.equal(solution.reverseWords('This is an example!'), 'sihT si na !elpmaxe')
    })
  })

  describe('sumIf', () => {
    it('should return the sum of all the multiples of 3 or 5', () => {
      assert.strictEqual(solution.sumIf(10), 23);
      assert.strictEqual(solution.sumIf(20), 78);
      assert.strictEqual(solution.sumIf(-1), 0);
      assert.strictEqual(solution.sumIf(0), 0);
      assert.strictEqual(solution.sumIf(1), 0);
      assert.strictEqual(solution.sumIf(2), 0);
    })
  })
})
