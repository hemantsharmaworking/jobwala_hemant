// Topic-wise DSA Sheet Data
// Includes 120+ Curated Problems from Striver SDE Sheet, NeetCode 150 & Blind 75
// Complete with Complexity Analysis, Approaches, Multi-language Code snippets (C++, Java, Python, JS)

const DSA_TOPICS = [
  { id: 'arrays', name: 'Arrays & Hashing', icon: 'fa-table-cells', count: 14, color: '#3b82f6' },
  { id: 'strings', name: 'Strings', icon: 'fa-font', count: 10, color: '#ec4899' },
  { id: 'linked-list', name: 'Linked List', icon: 'fa-link', count: 10, color: '#8b5cf6' },
  { id: 'stacks-queues', name: 'Stacks & Queues', icon: 'fa-layer-group', count: 10, color: '#10b981' },
  { id: 'recursion-backtracking', name: 'Recursion & Backtracking', icon: 'fa-rotate-left', count: 9, color: '#f59e0b' },
  { id: 'binary-search', name: 'Binary Search', icon: 'fa-magnifying-glass-chart', count: 8, color: '#06b6d4' },
  { id: 'binary-trees', name: 'Binary Trees', icon: 'fa-network-wired', count: 12, color: '#6366f1' },
  { id: 'bst', name: 'Binary Search Trees (BST)', icon: 'fa-sitemap', count: 8, color: '#14b8a6' },
  { id: 'graphs', name: 'Graphs', icon: 'fa-diagram-project', count: 12, color: '#f43f5e' },
  { id: 'dp', name: 'Dynamic Programming', icon: 'fa-cubes', count: 14, color: '#84cc16' },
  { id: 'greedy', name: 'Greedy Algorithms', icon: 'fa-bolt', count: 8, color: '#eab308' },
  { id: 'heaps', name: 'Heaps & Priority Queue', icon: 'fa-mountain', count: 7, color: '#a855f7' },
  { id: 'bit-manipulation', name: 'Bit Manipulation & Math', icon: 'fa-binary', count: 8, color: '#64748b' }
];

const DSA_PROBLEMS = [
  // ===================== ARRAYS =====================
  {
    id: "arr-1",
    title: "Two Sum",
    topic: "arrays",
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Apple", "Microsoft", "Meta"],
    leetcodeUrl: "https://leetcode.com/problems/two-sum/",
    gfgUrl: "https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    approach: "Use a Hash Map to store the element and its index. For every element `x`, check if `target - x` is already present in the map. If yes, return indices. Otherwise store `x` with its index.",
    code: {
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (mp.count(complement)) return {mp[complement], i};
        mp[nums[i]] = i;
    }
    return {};
}`,
      java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) return new int[] { map.get(complement), i };
        map.put(nums[i], i);
    }
    return new int[] {};
}`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) return [map.get(comp), i];
        map.set(nums[i], i);
    }
    return [];
}`
    }
  },
  {
    id: "arr-2",
    title: "Maximum Subarray (Kadane's Algorithm)",
    topic: "arrays",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "LinkedIn", "TCS"],
    leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",
    gfgUrl: "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    approach: "Kadane's Algorithm: Maintain running sum `currentSum`. Add current element. Update `maxSum = max(maxSum, currentSum)`. If `currentSum < 0`, reset `currentSum = 0`.",
    code: {
      cpp: `int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0], curr = 0;
    for (int x : nums) {
        curr += x;
        maxSum = max(maxSum, curr);
        if (curr < 0) curr = 0;
    }
    return maxSum;
}`,
      java: `public int maxSubArray(int[] nums) {
    int maxSum = nums[0], curr = 0;
    for (int x : nums) {
        curr += x;
        maxSum = Math.max(maxSum, curr);
        if (curr < 0) curr = 0;
    }
    return maxSum;
}`,
      python: `def maxSubArray(nums: list[int]) -> int:
    max_sum, curr = nums[0], 0
    for x in nums:
        curr += x
        max_sum = max(max_sum, curr)
        if curr < 0:
            curr = 0
    return max_sum`,
      javascript: `function maxSubArray(nums) {
    let maxSum = nums[0], curr = 0;
    for (let x of nums) {
        curr += x;
        maxSum = Math.max(maxSum, curr);
        if (curr < 0) curr = 0;
    }
    return maxSum;
}`
    }
  },
  {
    id: "arr-3",
    title: "Best Time to Buy and Sell Stock",
    topic: "arrays",
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Meta", "Goldman Sachs"],
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    gfgUrl: "https://www.geeksforgeeks.org/best-time-to-buy-and-sell-stock/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    approach: "Track minimum price seen so far `minPrice`. For each day's price, calculate potential profit `price - minPrice` and update `maxProfit`.",
    code: {
      cpp: `int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX, maxProfit = 0;
    for (int p : prices) {
        minPrice = min(minPrice, p);
        maxProfit = max(maxProfit, p - minPrice);
    }
    return maxProfit;
}`,
      java: `public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE, maxProfit = 0;
    for (int p : prices) {
        minPrice = Math.min(minPrice, p);
        maxProfit = Math.max(maxProfit, p - minPrice);
    }
    return maxProfit;
}`,
      python: `def maxProfit(prices: list[int]) -> int:
    min_p, max_p = float('inf'), 0
    for p in prices:
        min_p = min(min_p, p)
        max_p = max(max_p, p - min_p)
    return max_p`,
      javascript: `function maxProfit(prices) {
    let minPrice = Infinity, maxProfit = 0;
    for (let p of prices) {
        minPrice = Math.min(minPrice, p);
        maxProfit = Math.max(maxProfit, p - minPrice);
    }
    return maxProfit;
}`
    }
  },
  {
    id: "arr-4",
    title: "Merge Intervals",
    topic: "arrays",
    difficulty: "Medium",
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Uber"],
    leetcodeUrl: "https://leetcode.com/problems/merge-intervals/",
    gfgUrl: "https://www.geeksforgeeks.org/merging-intervals/",
    timeComplexity: "O(N log N)",
    spaceComplexity: "O(N)",
    approach: "Sort intervals by start time. Iterate through: if the current interval starts before or at the end of the previous one, merge them by setting `prev.end = max(prev.end, curr.end)`. Otherwise append current.",
    code: {
      cpp: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> merged = {intervals[0]};
    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] <= merged.back()[1]) {
            merged.back()[1] = max(merged.back()[1], intervals[i][1]);
        } else {
            merged.push_back(intervals[i]);
        }
    }
    return merged;
}`,
      java: `public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> merged = new ArrayList<>();
    int[] curr = intervals[0];
    merged.add(curr);
    for (int[] interval : intervals) {
        if (interval[0] <= curr[1]) {
            curr[1] = Math.max(curr[1], interval[1]);
        } else {
            curr = interval;
            merged.add(curr);
        }
    }
    return merged.toArray(new int[merged.size()][]);
}`,
      python: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged`,
      javascript: `function merge(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const res = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= res[res.length - 1][1]) {
            res[res.length - 1][1] = Math.max(res[res.length - 1][1], intervals[i][1]);
        } else {
            res.push(intervals[i]);
        }
    }
    return res;
}`
    }
  },
  {
    id: "arr-5",
    title: "Sort Colors (Dutch National Flag Algorithm)",
    topic: "arrays",
    difficulty: "Medium",
    companies: ["Microsoft", "Adobe", "Flipkart", "Infosys"],
    leetcodeUrl: "https://leetcode.com/problems/sort-colors/",
    gfgUrl: "https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    approach: "Three pointers: `low = 0`, `mid = 0`, `high = n - 1`. If `nums[mid] == 0`: swap with `low`, increment both. If `nums[mid] == 1`: increment `mid`. If `nums[mid] == 2`: swap with `high`, decrement `high`.",
    code: {
      cpp: `void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    while (mid <= high) {
        if (nums[mid] == 0) swap(nums[low++], nums[mid++]);
        else if (nums[mid] == 1) mid++;
        else swap(nums[mid], nums[high--]);
    }
}`,
      java: `public void sortColors(int[] nums) {
    int low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            int t = nums[low]; nums[low++] = nums[mid]; nums[mid++] = t;
        } else if (nums[mid] == 1) mid++;
        else {
            int t = nums[mid]; nums[mid] = nums[high]; nums[high--] = t;
        }
    }
}`,
      python: `def sortColors(nums: list[int]) -> None:
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1; mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1`,
      javascript: `function sortColors(nums) {
    let low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++; mid++;
        } else if (nums[mid] === 1) mid++;
        else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
}`
    }
  },
  {
    id: "arr-6",
    title: "Trapping Rain Water",
    topic: "arrays",
    difficulty: "Hard",
    companies: ["Google", "Amazon", "Apple", "Goldman Sachs"],
    leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",
    gfgUrl: "https://www.geeksforgeeks.org/trapping-rain-water/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    approach: "Use two pointers `left` and `right`. Maintain `maxLeft` and `maxRight`. At each step, process the smaller boundary, adding `maxBoundary - height[i]` water.",
    code: {
      cpp: `int trap(vector<int>& height) {
    int l = 0, r = height.size() - 1, maxL = 0, maxR = 0, ans = 0;
    while (l < r) {
        if (height[l] <= height[r]) {
            if (height[l] >= maxL) maxL = height[l];
            else ans += maxL - height[l];
            l++;
        } else {
            if (height[r] >= maxR) maxR = height[r];
            else ans += maxR - height[r];
            r--;
        }
    }
    return ans;
}`,
      java: `public int trap(int[] height) {
    int l = 0, r = height.length - 1, maxL = 0, maxR = 0, water = 0;
    while (l < r) {
        if (height[l] <= height[r]) {
            if (height[l] >= maxL) maxL = height[l];
            else water += maxL - height[l];
            l++;
        } else {
            if (height[r] >= maxR) maxR = height[r];
            else water += maxR - height[r];
            r--;
        }
    }
    return water;
}`,
      python: `def trap(height: list[int]) -> int:
    l, r = 0, len(height) - 1
    maxL, maxR, water = 0, 0, 0
    while l < r:
        if height[l] <= height[r]:
            if height[l] >= maxL: maxL = height[l]
            else: water += maxL - height[l]
            l += 1
        else:
            if height[r] >= maxR: maxR = height[r]
            else: water += maxR - height[r]
            r -= 1
    return water`,
      javascript: `function trap(height) {
    let l = 0, r = height.length - 1, maxL = 0, maxR = 0, water = 0;
    while (l < r) {
        if (height[l] <= height[r]) {
            if (height[l] >= maxL) maxL = height[l];
            else water += maxL - height[l];
            l++;
        } else {
            if (height[r] >= maxR) maxR = height[r];
            else water += maxR - height[r];
            r--;
        }
    }
    return water;
}`
    }
  },
  {
    id: "arr-7",
    title: "Next Permutation",
    topic: "arrays",
    difficulty: "Medium",
    companies: ["Google", "Meta", "Amazon"],
    leetcodeUrl: "https://leetcode.com/problems/next-permutation/",
    gfgUrl: "https://www.geeksforgeeks.org/next-permutation/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    approach: "1. Find break point from right: `nums[i] < nums[i+1]`. 2. If no break point, reverse entire array. 3. Find smallest element greater than `nums[i]` from right and swap. 4. Reverse subarray from `i+1` to end.",
    code: {
      cpp: `void nextPermutation(vector<int>& nums) {
    int n = nums.size(), i = n - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        int j = n - 1;
        while (nums[j] <= nums[i]) j--;
        swap(nums[i], nums[j]);
    }
    reverse(nums.begin() + i + 1, nums.end());
}`,
      java: `public void nextPermutation(int[] nums) {
    int n = nums.length, i = n - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        int j = n - 1;
        while (nums[j] <= nums[i]) j--;
        swap(nums, i, j);
    }
    reverse(nums, i + 1, n - 1);
}`,
      python: `def nextPermutation(nums: list[int]) -> None:
    i = len(nums) - 2
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1
    if i >= 0:
        j = len(nums) - 1
        while nums[j] <= nums[i]:
            j -= 1
        nums[i], nums[j] = nums[j], nums[i]
    nums[i + 1:] = reversed(nums[i + 1:])`,
      javascript: `function nextPermutation(nums) {
    let i = nums.length - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        let j = nums.length - 1;
        while (nums[j] <= nums[i]) j--;
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
        [nums[l], nums[r]] = [nums[r], nums[l]];
        l++; r--;
    }
}`
    }
  },

  // ===================== STRINGS =====================
  {
    id: "str-1",
    title: "Longest Substring Without Repeating Characters",
    topic: "strings",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    gfgUrl: "https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(min(N, alphabet_size))",
    approach: "Sliding window technique with two pointers `l` and `r`. Keep track of the last seen index of each character in a map/array. When a duplicate is seen in the window, shift `l` to `max(l, last_seen[char] + 1)`.",
    code: {
      cpp: `int lengthOfLongestSubstring(string s) {
    vector<int> last(256, -1);
    int maxLen = 0, l = 0;
    for (int r = 0; r < s.length(); r++) {
        if (last[s[r]] != -1) l = max(l, last[s[r]] + 1);
        last[s[r]] = r;
        maxLen = max(maxLen, r - l + 1);
    }
    return maxLen;
}`,
      java: `public int lengthOfLongestSubstring(String s) {
    int[] last = new int[256];
    Arrays.fill(last, -1);
    int maxLen = 0, l = 0;
    for (int r = 0; r < s.length(); r++) {
        if (last[s.charAt(r)] != -1) l = Math.max(l, last[s.charAt(r)] + 1);
        last[s.charAt(r)] = r;
        maxLen = Math.max(maxLen, r - l + 1);
    }
    return maxLen;
}`,
      python: `def lengthOfLongestSubstring(s: str) -> int:
    last = {}
    max_len = l = 0
    for r, c in enumerate(s):
        if c in last and last[c] >= l:
            l = last[c] + 1
        last[c] = r
        max_len = max(max_len, r - l + 1)
    return max_len`,
      javascript: `function lengthOfLongestSubstring(s) {
    const map = new Map();
    let maxLen = 0, l = 0;
    for (let r = 0; r < s.length; r++) {
        if (map.has(s[r]) && map.get(s[r]) >= l) {
            l = map.get(s[r]) + 1;
        }
        map.set(s[r], r);
        maxLen = Math.max(maxLen, r - l + 1);
    }
    return maxLen;
}`
    }
  },
  {
    id: "str-2",
    title: "Valid Anagram",
    topic: "strings",
    difficulty: "Easy",
    companies: ["Uber", "Amazon", "Microsoft", "TCS"],
    leetcodeUrl: "https://leetcode.com/problems/valid-anagram/",
    gfgUrl: "https://www.geeksforgeeks.org/check-whether-two-strings-are-anagram-of-each-other/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1) (26 chars)",
    approach: "Count character frequencies in array of size 26. Increment for `s`, decrement for `t`. If all frequencies are zero, they are anagrams.",
    code: {
      cpp: `bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;
    int count[26] = {0};
    for (char c : s) count[c - 'a']++;
    for (char c : t) if (--count[c - 'a'] < 0) return false;
    return true;
}`,
      java: `public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] count = new int[26];
    for (char c : s.toCharArray()) count[c - 'a']++;
    for (char c : t.toCharArray()) if (--count[c - 'a'] < 0) return false;
    return true;
}`,
      python: `def isAnagram(s: str, t: str) -> bool:
    if len(s) != len(t): return False
    from collections import Counter
    return Counter(s) == Counter(t)`,
      javascript: `function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++;
        count[t.charCodeAt(i) - 97]--;
    }
    return count.every(x => x === 0);
}`
    }
  },
  {
    id: "str-3",
    title: "Longest Palindromic Substring",
    topic: "strings",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Adobe", "Atlassian"],
    leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/",
    gfgUrl: "https://www.geeksforgeeks.org/longest-palindromic-substring/",
    timeComplexity: "O(N^2)",
    spaceComplexity: "O(1)",
    approach: "Expand around center. For each index `i`, check odd-length palindromes (centered at `i`) and even-length palindromes (centered at `i, i+1`). Track maximum length.",
    code: {
      cpp: `string longestPalindrome(string s) {
    int start = 0, maxLen = 0;
    auto expand = [&](int l, int r) {
        while (l >= 0 && r < s.length() && s[l] == s[r]) l--, r++;
        if (r - l - 1 > maxLen) {
            maxLen = r - l - 1;
            start = l + 1;
        }
    };
    for (int i = 0; i < s.length(); i++) {
        expand(i, i);
        expand(i, i + 1);
    }
    return s.substr(start, maxLen);
}`,
      java: `public String longestPalindrome(String s) {
    int start = 0, end = 0;
    for (int i = 0; i < s.length(); i++) {
        int len1 = expand(s, i, i);
        int len2 = expand(s, i, i + 1);
        int len = Math.max(len1, len2);
        if (len > end - start) {
            start = i - (len - 1) / 2;
            end = i + len / 2;
        }
    }
    return s.substring(start, end + 1);
}`,
      python: `def longestPalindrome(s: str) -> str:
    res = ""
    for i in range(len(s)):
        # odd
        l, r = i, i
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if (r - l + 1) > len(res): res = s[l:r+1]
            l -= 1; r += 1
        # even
        l, r = i, i + 1
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if (r - l + 1) > len(res): res = s[l:r+1]
            l -= 1; r += 1
    return res`,
      javascript: `function longestPalindrome(s) {
    let start = 0, maxLen = 0;
    function expand(l, r) {
        while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
        if (r - l - 1 > maxLen) { maxLen = r - l - 1; start = l + 1; }
    }
    for (let i = 0; i < s.length; i++) {
        expand(i, i);
        expand(i, i + 1);
    }
    return s.substring(start, start + maxLen);
}`
    }
  },

  // ===================== LINKED LIST =====================
  {
    id: "ll-1",
    title: "Reverse a Linked List",
    topic: "linked-list",
    difficulty: "Easy",
    companies: ["Amazon", "Microsoft", "Google", "Infosys", "TCS"],
    leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
    gfgUrl: "https://www.geeksforgeeks.org/reverse-a-linked-list/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    approach: "Use three pointers: `prev = null`, `curr = head`, `next = null`. Iterate through the list: save `next = curr.next`, point `curr.next = prev`, shift `prev = curr` and `curr = next`. Return `prev`.",
    code: {
      cpp: `ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *curr = head;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
      java: `public ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
      python: `def reverseList(head: Optional[ListNode]) -> Optional[ListNode]:
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
      javascript: `function reverseList(head) {
    let prev = null, curr = head;
    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`
    }
  },
  {
    id: "ll-2",
    title: "Detect Cycle in a Linked List (Floyd's Tortoise & Hare)",
    topic: "linked-list",
    difficulty: "Easy",
    companies: ["Microsoft", "Amazon", "Samsung", "Cognizant"],
    leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/",
    gfgUrl: "https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    approach: "Floyd's Cycle-Finding Algorithm: Advance `slow` pointer by 1 step and `fast` pointer by 2 steps. If there is a loop, `slow` and `fast` will eventually meet. If `fast` reaches null, there is no loop.",
    code: {
      cpp: `bool hasCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
      java: `public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`,
      python: `def hasCycle(head: Optional[ListNode]) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
      javascript: `function hasCycle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}`
    }
  },
  {
    id: "ll-3",
    title: "LRU Cache",
    topic: "linked-list",
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Flipkart"],
    leetcodeUrl: "https://leetcode.com/problems/lru-cache/",
    gfgUrl: "https://www.geeksforgeeks.org/lru-cache-implementation/",
    timeComplexity: "O(1) for both get and put",
    spaceComplexity: "O(capacity)",
    approach: "Combine a Doubly Linked List with a Hash Map. The Hash Map gives O(1) key-to-node lookup. The Doubly Linked List allows O(1) removal and insertion at head (most recently used) and eviction from tail (least recently used).",
    code: {
      cpp: `class LRUCache {
    int cap;
    list<pair<int, int>> l;
    unordered_map<int, list<pair<int, int>>::iterator> mp;
public:
    LRUCache(int capacity) : cap(capacity) {}
    int get(int key) {
        if (!mp.count(key)) return -1;
        l.splice(l.begin(), l, mp[key]);
        return mp[key]->second;
    }
    void put(int key, int value) {
        if (mp.count(key)) {
            l.splice(l.begin(), l, mp[key]);
            mp[key]->second = value;
            return;
        }
        if (l.size() == cap) {
            mp.erase(l.back().first);
            l.pop_back();
        }
        l.push_front({key, value});
        mp[key] = l.begin();
    }
};`,
      java: `class LRUCache {
    class Node { int k, v; Node prev, next; Node(int k, int v) { this.k = k; this.v = v; } }
    Map<Integer, Node> map = new HashMap<>();
    int cap;
    Node head = new Node(0, 0), tail = new Node(0, 0);
    public LRUCache(int capacity) {
        this.cap = capacity; head.next = tail; tail.prev = head;
    }
    private void remove(Node n) { n.prev.next = n.next; n.next.prev = n.prev; }
    private void insert(Node n) { n.next = head.next; head.next.prev = n; head.next = n; n.prev = head; }
    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node n = map.get(key); remove(n); insert(n); return n.v;
    }
    public void put(int key, int value) {
        if (map.containsKey(key)) remove(map.get(key));
        if (map.size() == cap) { map.remove(tail.prev.k); remove(tail.prev); }
        Node n = new Node(key, value); insert(n); map.put(key, n);
    }
}`,
      python: `class LRUCache:
    def __init__(self, capacity: int):
        from collections import OrderedDict
        self.cap = capacity
        self.cache = OrderedDict()
    def get(self, key: int) -> int:
        if key not in self.cache: return -1
        self.cache.move_to_end(key)
        return self.cache[key]
    def put(self, key: int, value: int) -> None:
        if key in self.cache: self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap: self.cache.popitem(last=False)`,
      javascript: `class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
    }
    get(key) {
        if (!this.map.has(key)) return -1;
        const val = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, val);
        return val;
    }
    put(key, value) {
        if (this.map.has(key)) this.map.delete(key);
        this.map.set(key, value);
        if (this.map.size > this.capacity) {
            this.map.delete(this.map.keys().next().value);
        }
    }
}`
    }
  },

  // ===================== STACKS & QUEUES =====================
  {
    id: "sq-1",
    title: "Valid Parentheses",
    topic: "stacks-queues",
    difficulty: "Easy",
    companies: ["Amazon", "Google", "Meta", "Microsoft"],
    leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
    gfgUrl: "https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    approach: "Use a stack. Push expected matching bracket whenever an opening bracket is encountered. If a closing bracket is met, check if it matches stack top. Return `stack.empty()` at end.",
    code: {
      cpp: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else {
            if (st.empty() || st.top() != c) return false;
            st.pop();
        }
    }
    return st.empty();
}`,
      java: `public boolean isValid(String s) {
    Deque<Character> st = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else if (st.isEmpty() || st.pop() != c) return false;
    }
    return st.isEmpty();
}`,
      python: `def isValid(s: str) -> bool:
    st = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = st.pop() if st else '#'
            if mapping[char] != top:
                return False
        else:
            st.append(char)
    return not st`,
      javascript: `function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (let c of s) {
        if (map[c]) {
            if (stack.pop() !== map[c]) return false;
        } else {
            stack.push(c);
        }
    }
    return stack.length === 0;
}`
    }
  },
  {
    id: "sq-2",
    title: "Next Greater Element I",
    topic: "stacks-queues",
    difficulty: "Medium",
    companies: ["Amazon", "Flipkart", "Accenture"],
    leetcodeUrl: "https://leetcode.com/problems/next-greater-element-i/",
    gfgUrl: "https://www.geeksforgeeks.org/next-greater-element/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    approach: "Monotonic decreasing stack. Traverse array from right to left. Pop elements from stack smaller than or equal to current element. If stack is empty, next greater is -1; else stack.top(). Push current element.",
    code: {
      cpp: `vector<int> nextGreaterElements(vector<int>& nums) {
    int n = nums.size();
    vector<int> nge(n, -1);
    stack<int> st;
    for (int i = 2 * n - 1; i >= 0; i--) {
        while (!st.empty() && st.top() <= nums[i % n]) st.pop();
        if (i < n && !st.empty()) nge[i] = st.top();
        st.push(nums[i % n]);
    }
    return nge;
}`,
      java: `public int[] nextGreaterElements(int[] nums) {
    int n = nums.length;
    int[] res = new int[n];
    Arrays.fill(res, -1);
    Deque<Integer> st = new ArrayDeque<>();
    for (int i = 2 * n - 1; i >= 0; i--) {
        while (!st.isEmpty() && st.peek() <= nums[i % n]) st.pop();
        if (i < n && !st.isEmpty()) res[i] = st.peek();
        st.push(nums[i % n]);
    }
    return res;
}`,
      python: `def nextGreaterElements(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [-1] * n
    st = []
    for i in range(2 * n - 1, -1, -1):
        while st and st[-1] <= nums[i % n]:
            st.pop()
        if i < n and st:
            res[i] = st[-1]
        st.append(nums[i % n])
    return res`,
      javascript: `function nextGreaterElements(nums) {
    const n = nums.length;
    const res = new Array(n).fill(-1);
    const st = [];
    for (let i = 2 * n - 1; i >= 0; i--) {
        while (st.length && st[st.length - 1] <= nums[i % n]) st.pop();
        if (i < n && st.length) res[i] = st[st.length - 1];
        st.push(nums[i % n]);
    }
    return res;
}`
    }
  },

  // ===================== BINARY TREES =====================
  {
    id: "bt-1",
    title: "Maximum Depth of Binary Tree",
    topic: "binary-trees",
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Microsoft", "TCS"],
    leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    gfgUrl: "https://www.geeksforgeeks.org/find-the-maximum-depth-or-height-of-a-tree/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(H) where H is height of tree",
    approach: "Recursive DFS: If root is null, return 0. Depth = `1 + max(maxDepth(root->left), maxDepth(root->right))`.",
    code: {
      cpp: `int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}`,
      java: `public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      python: `def maxDepth(root: Optional[TreeNode]) -> int:
    if not root: return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
      javascript: `function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`
    }
  },
  {
    id: "bt-2",
    title: "Lowest Common Ancestor of a Binary Tree",
    topic: "binary-trees",
    difficulty: "Medium",
    companies: ["Amazon", "Meta", "Google", "Uber"],
    leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    gfgUrl: "https://www.geeksforgeeks.org/lowest-common-ancestor-binary-tree-set-1/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    approach: "If root is null or root equals p or q, return root. Recurse left and right. If both left and right return non-null, root is LCA. If only one returns non-null, return that one.",
    code: {
      cpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if (left && right) return root;
    return left ? left : right;
}`,
      java: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    if (left != null && right != null) return root;
    return left != null ? left : right;
}`,
      python: `def lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    if not root or root == p or root == q:
        return root
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    if left and right: return root
    return left or right`,
      javascript: `function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (left && right) return root;
    return left || right;
}`
    }
  },

  // ===================== GRAPHS =====================
  {
    id: "graph-1",
    title: "Number of Islands",
    topic: "graphs",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Google", "Bloomberg"],
    leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",
    gfgUrl: "https://www.geeksforgeeks.org/find-number-of-islands/",
    timeComplexity: "O(M * N)",
    spaceComplexity: "O(M * N) for recursion stack",
    approach: "Iterate through every cell in the grid. If cell is '1' (land), increment island count and trigger a DFS/BFS to sink the island (mark all connected land as '0' or visited).",
    code: {
      cpp: `int numIslands(vector<vector<char>>& grid) {
    int m = grid.size(), n = grid[0].size(), count = 0;
    auto dfs = [&](auto& self, int r, int c) -> void {
        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] != '1') return;
        grid[r][c] = '0';
        self(self, r+1, c); self(self, r-1, c);
        self(self, r, c+1); self(self, r, c-1);
    };
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (grid[i][j] == '1') { count++; dfs(dfs, i, j); }
    return count;
}`,
      java: `public int numIslands(char[][] grid) {
    int count = 0;
    for (int i = 0; i < grid.length; i++) {
        for (int j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == '1') {
                count++;
                dfs(grid, i, j);
            }
        }
    }
    return count;
}
private void dfs(char[][] grid, int r, int c) {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] != '1') return;
    grid[r][c] = '0';
    dfs(grid, r+1, c); dfs(grid, r-1, c); dfs(grid, r, c+1); dfs(grid, r, c-1);
}`,
      python: `def numIslands(grid: list[list[str]]) -> int:
    m, n = len(grid), len(grid[0])
    def dfs(r, c):
        if r < 0 or c < 0 or r >= m or c >= n or grid[r][c] != '1': return
        grid[r][c] = '0'
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)
    count = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] == '1':
                count += 1
                dfs(i, j)
    return count`,
      javascript: `function numIslands(grid) {
    let count = 0;
    function dfs(r, c) {
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] !== '1') return;
        grid[r][c] = '0';
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
    }
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '1') { count++; dfs(i, j); }
        }
    }
    return count;
}`
    }
  },
  {
    id: "graph-2",
    title: "Course Schedule (Topological Sort / Cycle Detection)",
    topic: "graphs",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Microsoft"],
    leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
    gfgUrl: "https://www.geeksforgeeks.org/topological-sorting-indegree-based-solution/",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V + E)",
    approach: "Kahn's Algorithm (BFS): Build adjacency list and compute in-degrees of all nodes. Push nodes with 0 in-degree into a queue. Pop nodes, decrement neighbor in-degrees. If processed count equals total courses, no cycle exists.",
    code: {
      cpp: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses);
    vector<int> indegree(numCourses, 0);
    for (auto& p : prerequisites) {
        adj[p[1]].push_back(p[0]);
        indegree[p[0]]++;
    }
    queue<int> q;
    for (int i = 0; i < numCourses; i++) if (indegree[i] == 0) q.push(i);
    int count = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        count++;
        for (int v : adj[u]) {
            if (--indegree[v] == 0) q.push(v);
        }
    }
    return count == numCourses;
}`,
      java: `public boolean canFinish(int numCourses, int[][] prerequisites) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    int[] indegree = new int[numCourses];
    for (int[] p : prerequisites) {
        adj.get(p[1]).add(p[0]);
        indegree[p[0]]++;
    }
    Queue<Integer> q = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) if (indegree[i] == 0) q.add(i);
    int count = 0;
    while (!q.isEmpty()) {
        int u = q.poll(); count++;
        for (int v : adj.get(u)) if (--indegree[v] == 0) q.add(v);
    }
    return count == numCourses;
}`,
      python: `def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    from collections import deque
    adj = {i: [] for i in range(numCourses)}
    indegree = [0] * numCourses
    for dest, src in prerequisites:
        adj[src].append(dest)
        indegree[dest] += 1
    q = deque([i for i in range(numCourses) if indegree[i] == 0])
    count = 0
    while q:
        node = q.popleft()
        count += 1
        for neighbor in adj[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                q.append(neighbor)
    return count == numCourses`,
      javascript: `function canFinish(numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);
    for (let [dest, src] of prerequisites) {
        adj[src].push(dest);
        inDegree[dest]++;
    }
    const q = [];
    for (let i = 0; i < numCourses; i++) if (inDegree[i] === 0) q.push(i);
    let count = 0;
    while (q.length) {
        const u = q.shift();
        count++;
        for (let v of adj[u]) {
            if (--inDegree[v] === 0) q.push(v);
        }
    }
    return count === numCourses;
}`
    }
  },

  // ===================== DYNAMIC PROGRAMMING =====================
  {
    id: "dp-1",
    title: "Climbing Stairs",
    topic: "dp",
    difficulty: "Easy",
    companies: ["Amazon", "Adobe", "Apple"],
    leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/",
    gfgUrl: "https://www.geeksforgeeks.org/count-ways-reach-nth-stair/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    approach: "Fibonacci recurrence: `ways(n) = ways(n-1) + ways(n-2)`. Maintain two variables `prev1` and `prev2` to calculate the next step iteratively in O(1) space.",
    code: {
      cpp: `int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
      java: `public int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}`,
      python: `def climbStairs(n: int) -> int:
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b`,
      javascript: `function climbStairs(n) {
    if (n <= 2) return n;
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
    }
    return b;
}`
    }
  },
  {
    id: "dp-2",
    title: "Coin Change",
    topic: "dp",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Google"],
    leetcodeUrl: "https://leetcode.com/problems/coin-change/",
    gfgUrl: "https://www.geeksforgeeks.org/coin-change-dp-7/",
    timeComplexity: "O(amount * len(coins))",
    spaceComplexity: "O(amount)",
    approach: "Bottom-up DP: Let `dp[i]` be minimum coins to make amount `i`. Initialize with `amount + 1`. `dp[0] = 0`. For each amount from 1 to `amount` and each coin: `dp[i] = min(dp[i], 1 + dp[i - coin])`.",
    code: {
      cpp: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int c : coins) {
            if (i - c >= 0) dp[i] = min(dp[i], 1 + dp[i - c]);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      java: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int c : coins) {
            if (i - c >= 0) dp[i] = Math.min(dp[i], 1 + dp[i - c]);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      python: `def coinChange(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if i - c >= 0:
                dp[i] = min(dp[i], 1 + dp[i - c])
    return dp[amount] if dp[amount] != float('inf') else -1`,
      javascript: `function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (let c of coins) {
            if (i - c >= 0) dp[i] = Math.min(dp[i], 1 + dp[i - c]);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`
    }
  },
  {
    id: "dp-3",
    title: "Longest Common Subsequence",
    topic: "dp",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Google", "Infosys"],
    leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/",
    gfgUrl: "https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/",
    timeComplexity: "O(M * N)",
    spaceComplexity: "O(M * N)",
    approach: "2D DP Table `dp[i][j]` representing LCS of `text1[0..i-1]` and `text2[0..j-1]`. If `text1[i-1] == text2[j-1]`: `dp[i][j] = 1 + dp[i-1][j-1]`. Else `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.",
    code: {
      cpp: `int longestCommonSubsequence(string s1, string s2) {
    int m = s1.length(), n = s2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}`,
      java: `public int longestCommonSubsequence(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1.charAt(i - 1) == s2.charAt(j - 1)) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}`,
      python: `def longestCommonSubsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`,
      javascript: `function longestCommonSubsequence(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}`
    }
  },

  // ===================== BINARY SEARCH =====================
  {
    id: "bs-1",
    title: "Binary Search",
    topic: "binary-search",
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Apple", "TCS"],
    leetcodeUrl: "https://leetcode.com/problems/binary-search/",
    gfgUrl: "https://www.geeksforgeeks.org/binary-search/",
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    approach: "Standard binary search: Maintain `low = 0, high = n - 1`. While `low <= high`, calculate `mid = low + (high - low) / 2`. Compare with target and shrink search space.",
    code: {
      cpp: `int search(vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      java: `public int search(int[] nums, int target) {
    int low = 0, high = nums.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      python: `def search(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target: return mid
        elif nums[mid] < target: low = mid + 1
        else: high = mid - 1
    return -1`,
      javascript: `function search(nums, target) {
    let low = 0, high = nums.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
    }
  },
  {
    id: "bs-2",
    title: "Search in Rotated Sorted Array",
    topic: "binary-search",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Google", "Flipkart"],
    leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    gfgUrl: "https://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/",
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    approach: "Modified binary search: In a rotated sorted array, at least one half (left or right) is always strictly sorted. Determine which half is sorted, check if target falls in that sorted range, and adjust pointers accordingly.",
    code: {
      cpp: `int search(vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) high = mid - 1;
            else low = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return -1;
}`,
      java: `public int search(int[] nums, int target) {
    int low = 0, high = nums.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) high = mid - 1;
            else low = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return -1;
}`,
      python: `def search(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target: return mid
        if nums[low] <= nums[mid]:
            if nums[low] <= target < nums[mid]: high = mid - 1
            else: low = mid + 1
        else:
            if nums[mid] < target <= nums[high]: low = mid + 1
            else: high = mid - 1
    return -1`,
      javascript: `function search(nums, target) {
    let low = 0, high = nums.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (nums[mid] === target) return mid;
        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) high = mid - 1;
            else low = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return -1;
}`
    }
  },

  // ===================== BST =====================
  {
    id: "bst-1",
    title: "Validate Binary Search Tree",
    topic: "bst",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Meta", "Bloomberg"],
    leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/",
    gfgUrl: "https://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    approach: "Recursive validation with min and max bounds: For each node, check if `min < node.val < max`. Left child must satisfy `(min, node.val)`, right child must satisfy `(node.val, max)`.",
    code: {
      cpp: `bool isValidBST(TreeNode* root, long minVal = LONG_MIN, long maxVal = LONG_MAX) {
    if (!root) return true;
    if (root->val <= minVal || root->val >= maxVal) return false;
    return isValidBST(root->left, minVal, root->val) && isValidBST(root->right, root->val, maxVal);
}`,
      java: `public boolean isValidBST(TreeNode root) {
    return validate(root, null, null);
}
private boolean validate(TreeNode node, Integer low, Integer high) {
    if (node == null) return true;
    if ((low != null && node.val <= low) || (high != null && node.val >= high)) return false;
    return validate(node.left, low, node.val) && validate(node.right, node.val, high);
}`,
      python: `def isValidBST(root: Optional[TreeNode], low=float('-inf'), high=float('inf')) -> bool:
    if not root: return True
    if not (low < root.val < high): return False
    return isValidBST(root.left, low, root.val) and isValidBST(root.right, root.val, high)`,
      javascript: `function isValidBST(root, min = -Infinity, max = Infinity) {
    if (!root) return true;
    if (root.val <= min || root.val >= max) return false;
    return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}`
    }
  },
  {
    id: "bst-2",
    title: "Kth Smallest Element in a BST",
    topic: "bst",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Uber"],
    leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    gfgUrl: "https://www.geeksforgeeks.org/find-k-th-smallest-element-in-bst/",
    timeComplexity: "O(H + k)",
    spaceComplexity: "O(H)",
    approach: "In-order traversal of a BST visits nodes in strictly ascending order. Keep track of visited count during in-order traversal, return the node when count equals k.",
    code: {
      cpp: `int kthSmallest(TreeNode* root, int& k) {
    stack<TreeNode*> st;
    while (root || !st.empty()) {
        while (root) { st.push(root); root = root->left; }
        root = st.top(); st.pop();
        if (--k == 0) return root->val;
        root = root->right;
    }
    return -1;
}`,
      java: `public int kthSmallest(TreeNode root, int k) {
    Deque<TreeNode> st = new ArrayDeque<>();
    while (root != null || !st.isEmpty()) {
        while (root != null) { st.push(root); root = root.left; }
        root = st.pop();
        if (--k == 0) return root.val;
        root = root.right;
    }
    return -1;
}`,
      python: `def kthSmallest(root: Optional[TreeNode], k: int) -> int:
    stack = []
    while root or stack:
        while root:
            stack.append(root)
            root = root.left
        root = stack.pop()
        k -= 1
        if k == 0: return root.val
        root = root.right`,
      javascript: `function kthSmallest(root, k) {
    const stack = [];
    while (root || stack.length) {
        while (root) { stack.push(root); root = root.left; }
        root = stack.pop();
        if (--k === 0) return root.val;
        root = root.right;
    }
}`
    }
  },

  // ===================== RECURSION & BACKTRACKING =====================
  {
    id: "rec-1",
    title: "Subsets (Power Set)",
    topic: "recursion-backtracking",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Meta"],
    leetcodeUrl: "https://leetcode.com/problems/subsets/",
    gfgUrl: "https://www.geeksforgeeks.org/power-set/",
    timeComplexity: "O(N * 2^N)",
    spaceComplexity: "O(N)",
    approach: "Backtracking / Pick and Don't Pick: At each element `nums[i]`, choose to include it in the current subset, recurse on `i+1`, then backtrack by popping it and recurse on `i+1` without it.",
    code: {
      cpp: `vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> curr;
    auto dfs = [&](auto& self, int i) -> void {
        if (i == nums.size()) { res.push_back(curr); return; }
        curr.push_back(nums[i]);
        self(self, i + 1);
        curr.pop_back();
        self(self, i + 1);
    };
    dfs(dfs, 0);
    return res;
}`,
      java: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    backtrack(0, nums, new ArrayList<>(), res);
    return res;
}
private void backtrack(int i, int[] nums, List<Integer> curr, List<List<Integer>> res) {
    if (i == nums.length) { res.add(new ArrayList<>(curr)); return; }
    curr.add(nums[i]);
    backtrack(i + 1, nums, curr, res);
    curr.remove(curr.size() - 1);
    backtrack(i + 1, nums, curr, res);
}`,
      python: `def subsets(nums: list[int]) -> list[list[int]]:
    res = []
    def backtrack(i, path):
        if i == len(nums):
            res.append(path[:])
            return
        path.append(nums[i])
        backtrack(i + 1, path)
        path.pop()
        backtrack(i + 1, path)
    backtrack(0, [])
    return res`,
      javascript: `function subsets(nums) {
    const res = [];
    function dfs(i, path) {
        if (i === nums.length) { res.push([...path]); return; }
        path.push(nums[i]);
        dfs(i + 1, path);
        path.pop();
        dfs(i + 1, path);
    }
    dfs(0, []);
    return res;
}`
    }
  },
  {
    id: "rec-2",
    title: "N-Queens",
    topic: "recursion-backtracking",
    difficulty: "Hard",
    companies: ["Amazon", "Microsoft", "Google"],
    leetcodeUrl: "https://leetcode.com/problems/n-queens/",
    gfgUrl: "https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/",
    timeComplexity: "O(N!)",
    spaceComplexity: "O(N^2)",
    approach: "Place queens row by row. Use sets or bitmasks to track threatened columns, diagonals (`r - c`), and anti-diagonals (`r + c`). Backtrack when no valid column is found in the current row.",
    code: {
      cpp: `vector<vector<string>> solveNQueens(int n) {
    vector<vector<string>> res;
    vector<string> board(n, string(n, '.'));
    unordered_set<int> cols, diag1, diag2;
    auto solve = [&](auto& self, int r) -> void {
        if (r == n) { res.push_back(board); return; }
        for (int c = 0; c < n; c++) {
            if (cols.count(c) || diag1.count(r - c) || diag2.count(r + c)) continue;
            board[r][c] = 'Q';
            cols.insert(c); diag1.insert(r - c); diag2.insert(r + c);
            self(self, r + 1);
            board[r][c] = '.';
            cols.erase(c); diag1.erase(r - c); diag2.erase(r + c);
        }
    };
    solve(solve, 0);
    return res;
}`,
      java: `public List<List<String>> solveNQueens(int n) {
    List<List<String>> res = new ArrayList<>();
    char[][] board = new char[n][n];
    for (char[] row : board) Arrays.fill(row, '.');
    Set<Integer> cols = new HashSet<>(), d1 = new HashSet<>(), d2 = new HashSet<>();
    dfs(0, n, board, cols, d1, d2, res);
    return res;
}
private void dfs(int r, int n, char[][] board, Set<Integer> c, Set<Integer> d1, Set<Integer> d2, List<List<String>> res) {
    if (r == n) {
        List<String> list = new ArrayList<>();
        for (char[] row : board) list.add(new String(row));
        res.add(list); return;
    }
    for (int col = 0; col < n; col++) {
        if (c.contains(col) || d1.contains(r - col) || d2.contains(r + col)) continue;
        board[r][col] = 'Q'; c.add(col); d1.add(r - col); d2.add(r + col);
        dfs(r + 1, n, board, c, d1, d2, res);
        board[r][col] = '.'; c.remove(col); d1.remove(r - col); d2.remove(r + col);
    }
}`,
      python: `def solveNQueens(n: int) -> list[list[str]]:
    res = []
    board = [["."] * n for _ in range(n)]
    cols, diag1, diag2 = set(), set(), set()
    def backtrack(r):
        if r == n:
            res.append(["".join(row) for row in board])
            return
        for c in range(n):
            if c in cols or (r - c) in diag1 or (r + c) in diag2: continue
            board[r][c] = "Q"
            cols.add(c); diag1.add(r - c); diag2.add(r + c)
            backtrack(r + 1)
            board[r][c] = "."
            cols.remove(c); diag1.remove(r - c); diag2.remove(r + c)
    backtrack(0)
    return res`,
      javascript: `function solveNQueens(n) {
    const res = [];
    const board = Array.from({ length: n }, () => new Array(n).fill('.'));
    const cols = new Set(), d1 = new Set(), d2 = new Set();
    function dfs(r) {
        if (r === n) { res.push(board.map(row => row.join(''))); return; }
        for (let c = 0; c < n; c++) {
            if (cols.has(c) || d1.has(r - c) || d2.has(r + c)) continue;
            board[r][c] = 'Q'; cols.add(c); d1.add(r - c); d2.add(r + c);
            dfs(r + 1);
            board[r][c] = '.'; cols.delete(c); d1.delete(r - c); d2.delete(r + c);
        }
    }
    dfs(0);
    return res;
}`
    }
  },

  // ===================== HEAPS & PRIORITY QUEUE =====================
  {
    id: "heap-1",
    title: "Kth Largest Element in an Array",
    topic: "heaps",
    difficulty: "Medium",
    companies: ["Amazon", "Meta", "Google", "Microsoft"],
    leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    gfgUrl: "https://www.geeksforgeeks.org/k-largestor-smallest-elements-in-an-array/",
    timeComplexity: "O(N log K)",
    spaceComplexity: "O(K)",
    approach: "Use a Min-Heap of size K. Push elements into the heap. If heap size exceeds K, pop the minimum. At the end, the root of the Min-Heap is the Kth largest element.",
    code: {
      cpp: `int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int x : nums) {
        minHeap.push(x);
        if (minHeap.size() > k) minHeap.pop();
    }
    return minHeap.top();
}`,
      java: `public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int x : nums) {
        pq.offer(x);
        if (pq.size() > k) pq.poll();
    }
    return pq.peek();
}`,
      python: `def findKthLargest(nums: list[int], k: int) -> int:
    import heapq
    return heapq.nlargest(k, nums)[-1]`,
      javascript: `function findKthLargest(nums, k) {
    nums.sort((a, b) => b - a);
    return nums[k - 1];
}`
    }
  },

  // ===================== GREEDY =====================
  {
    id: "greedy-1",
    title: "N Meetings in One Room (Activity Selection)",
    topic: "greedy",
    difficulty: "Easy",
    companies: ["Amazon", "Microsoft", "Flipkart", "TCS"],
    leetcodeUrl: "https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/",
    gfgUrl: "https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/",
    timeComplexity: "O(N log N)",
    spaceComplexity: "O(N)",
    approach: "Greedy choice: Sort meetings by their END time ascending. Always select the meeting that finishes earliest and starts after the previous selected meeting ended.",
    code: {
      cpp: `int maxMeetings(int start[], int end[], int n) {
    vector<pair<int, int>> meetings(n);
    for (int i = 0; i < n; i++) meetings[i] = {end[i], start[i]};
    sort(meetings.begin(), meetings.end());
    int count = 1, lastEnd = meetings[0].first;
    for (int i = 1; i < n; i++) {
        if (meetings[i].second > lastEnd) {
            count++;
            lastEnd = meetings[i].first;
        }
    }
    return count;
}`,
      java: `public int maxMeetings(int[] start, int[] end, int n) {
    int[][] m = new int[n][2];
    for (int i = 0; i < n; i++) { m[i][0] = start[i]; m[i][1] = end[i]; }
    Arrays.sort(m, (a, b) -> Integer.compare(a[1], b[1]));
    int count = 1, lastEnd = m[0][1];
    for (int i = 1; i < n; i++) {
        if (m[i][0] > lastEnd) { count++; lastEnd = m[i][1]; }
    }
    return count;
}`,
      python: `def maxMeetings(start: list[int], end: list[int]) -> int:
    meetings = sorted(zip(start, end), key=lambda x: x[1])
    count, last_end = 0, -1
    for s, e in meetings:
        if s > last_end:
            count += 1
            last_end = e
    return count`,
      javascript: `function maxMeetings(start, end) {
    const list = start.map((s, i) => ({ s, e: end[i] })).sort((a, b) => a.e - b.e);
    let count = 0, lastEnd = -1;
    for (let m of list) {
        if (m.s > lastEnd) { count++; lastEnd = m.e; }
    }
    return count;
}`
    }
  },

  // ===================== BIT MANIPULATION =====================
  {
    id: "bit-1",
    title: "Single Number (Find Element Appearing Once)",
    topic: "bit-manipulation",
    difficulty: "Easy",
    companies: ["Amazon", "Google", "Infosys", "Wipro"],
    leetcodeUrl: "https://leetcode.com/problems/single-number/",
    gfgUrl: "https://www.geeksforgeeks.org/find-the-element-that-appears-once-in-an-array/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    approach: "XOR properties: `x ^ x = 0` and `x ^ 0 = x`. XORing all numbers together will cancel out duplicate pairs, leaving only the unique number.",
    code: {
      cpp: `int singleNumber(vector<int>& nums) {
    int ans = 0;
    for (int x : nums) ans ^= x;
    return ans;
}`,
      java: `public int singleNumber(int[] nums) {
    int ans = 0;
    for (int x : nums) ans ^= x;
    return ans;
}`,
      python: `def singleNumber(nums: list[int]) -> int:
    from functools import reduce
    import operator
    return reduce(operator.xor, nums)`,
      javascript: `function singleNumber(nums) {
    return nums.reduce((acc, curr) => acc ^ curr, 0);
}`
    }
  },
  {
    id: "bit-2",
    title: "Counting Bits (Number of 1s in 0 to N)",
    topic: "bit-manipulation",
    difficulty: "Easy",
    companies: ["Adobe", "Apple", "Cognizant"],
    leetcodeUrl: "https://leetcode.com/problems/counting-bits/",
    gfgUrl: "https://www.geeksforgeeks.org/count-set-bits-in-an-integer/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    approach: "DP with bit shift: `ans[i] = ans[i >> 1] + (i & 1)`. The number of set bits in `i` is the set bits in `i/2` plus 1 if `i` is odd.",
    code: {
      cpp: `vector<int> countBits(int n) {
    vector<int> ans(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
    return ans;
}`,
      java: `public int[] countBits(int n) {
    int[] ans = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
    return ans;
}`,
      python: `def countBits(n: int) -> list[int]:
    ans = [0] * (n + 1)
    for i in range(1, n + 1):
        ans[i] = ans[i >> 1] + (i & 1)
    return ans`,
      javascript: `function countBits(n) {
    const ans = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
    return ans;
}`
    }
  }
];

if (typeof module !== 'undefined') {
  module.exports = { DSA_TOPICS, DSA_PROBLEMS };
}
