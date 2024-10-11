#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> nums(n);
        for (int i = 0; i < n; i++) {
            cin >> nums[i];
        }

        unordered_map<int, int> um;
        int maxi = 0, ans = 0;

        // Count occurrences of each number
        for (int i = 0; i < n; i++) {
            um[nums[i]]++;
        }

        // Find the most frequent number
        for (auto i : um) {
            if (maxi < i.second) {
                ans = i.first;  // Store the number with max frequency
                maxi = i.second;
            }
        }

        // Replace 0's with the most frequent number
        for (int i = 0; i < n; i++) {
            if (nums[i] == 0) {
                nums[i] = ans;
            }
        }

        // Print the modified array
        for (int i = 0; i < n; i++) {
            cout << nums[i] << " ";
        }
        cout << endl;  // No extra 0
    }

    return 0;
}
